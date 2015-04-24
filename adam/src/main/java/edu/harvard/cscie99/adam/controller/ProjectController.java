package edu.harvard.cscie99.adam.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.harvard.cscie99.adam.error.UnauthorizedOperationException;
import edu.harvard.cscie99.adam.model.Plate;
//import edu.harvard.cscie99.adam.model.Compound;
import edu.harvard.cscie99.adam.model.Project;
import edu.harvard.cscie99.adam.profile.User;
import edu.harvard.cscie99.adam.service.AuthenticationService;
import edu.harvard.cscie99.adam.service.PlateService;
import edu.harvard.cscie99.adam.service.ProfileService;
import edu.harvard.cscie99.adam.service.ProjectService;
import edu.harvard.cscie99.adam.service.TagService;

/**
 * 
 * @author Gerson
 *
 */
@RestController
@RequestMapping(value = "/")
public class ProjectController {

	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private PlateService plateService;

	@Autowired
	private TagService tagService;

	@Autowired
	private AuthenticationService authService;
	
	@Autowired
	private ProfileService profileService;
	
	@RequestMapping(value = "/rest/project", method = RequestMethod.POST)
	@ResponseBody
	public Project createProject(
			@RequestBody Project newProject,
			HttpServletRequest request) throws UnauthorizedOperationException{

		User owner = authService.getCurrentUser(request);
		newProject.setOwner(owner.getUsername());
		
		return projectService.createProject(newProject);
	}
	
//	@RequestMapping(value = "/rest/project2", method = RequestMethod.POST)
//	@ResponseBody
//	public Project createProject2(
//			@RequestBody Project newProject) throws UnauthorizedOperationException{
//		
//		System.out.println("algo");
//		return projectService.createProject(newProject);
//	}
	
	@RequestMapping(value = "/rest/project", method = RequestMethod.GET)
	@ResponseBody
	public List<Project> listProjects() throws UnauthorizedOperationException{
			
		List<Project> projects = projectService.list();
		for (Project project : projects){
			project.setPlates(null);
		}
		return projects;
	}
	
	@RequestMapping(value = "/rest/project/{project_id}", method = RequestMethod.GET)
	@ResponseBody
	public Project getProject(
			@PathVariable("project_id") int projectId) throws UnauthorizedOperationException{
		
		Project project = projectService.retrieveProject(projectId);
		
		project.setPlates(null);
		
		return project;
	}
	
	@RequestMapping(value = "/rest/project/{project_id}", method = RequestMethod.PUT)
	public @ResponseBody Project updateProject(
			@PathVariable("project_id") int projectId,
			@RequestBody Project project,
			HttpServletRequest request) {
		
		Project currentProject = projectService.retrieveProject(projectId);
		currentProject.setCollaborators(project.getCollaborators());
		currentProject.setDescription(project.getDescription());
		currentProject.setLabel(project.getLabel());
		currentProject.setName(project.getName());
		currentProject.setPublic(project.isPublic());
		currentProject.setTags(project.getTags());
		currentProject.setType(project.getType());
		
		projectService.updateProject(currentProject);
		
		//Dont return plates
		currentProject.setPlates(null);
		return currentProject;
	}
	
	@RequestMapping(value = "/rest/project/{project_id}", method = RequestMethod.DELETE)
	@ResponseBody
	public boolean deleteProject(
			@PathVariable("project_id") int projectId) throws UnauthorizedOperationException{
		
		Project project = projectService.retrieveProject(projectId);
		
		return projectService.deleteProject(project);
	}
	
	@RequestMapping(value = "/rest/project/{projectId}/add_plate/{plateId}", method = RequestMethod.POST)
	@ResponseBody
	public boolean addPlateToProject(
			@PathVariable("projectId") int projectId,
			@PathVariable("plateId") int plateId) throws UnauthorizedOperationException{
			
		Project project = projectService.retrieveProject(projectId);
		Plate plate = plateService.retrievePlate(plateId);
		project.getPlates().add(plate);
		plate.setProjectId("" + project.getId().intValue());
		
		projectService.updateProject(project);
		
		return true;
		
	}
	
	@RequestMapping(value = "/rest/project/{projectId}/remove_plate/{plateId}", method = RequestMethod.POST)
	@ResponseBody
	public boolean removePlateFromProject(
			@PathVariable("projectId") int projectId,
			@PathVariable("plateId") int plateId) throws UnauthorizedOperationException{
			
		Project project = projectService.retrieveProject(projectId);
		Plate plate = plateService.retrievePlate(plateId);
		project.getPlates().remove(plate);
		plate.setProjectId(null);
		
		projectService.updateProject(project);
		
		return true;
		
	}
	
	@RequestMapping(value = "/rest/project/{projectId}/list_plates", method = RequestMethod.GET)
	@ResponseBody
	public List<Plate> listPlatesFromProject(
			@PathVariable("projectId") int projectId) throws UnauthorizedOperationException{
			
		Project project = projectService.retrieveProject(projectId);
		
		List<Plate> plates = new ArrayList<Plate>();
		for (Plate plate : project.getPlates()){
			plates.add(plateService.retrievePlate(plate.getId()));
		}
		
		return plates;
	}
	
//	@RequestMapping(value = "/project/{projectId}/add_comment/{comment}", method = RequestMethod.POST)
//	@ResponseBody
//	public boolean addCommentToProject(
//			@PathVariable("projectId") int projectId,
//			@PathVariable("comment") String comment) throws UnauthorizedOperationException{
//		
//		Project project = projectService.retrieveProject(projectId);
////			project.getComments().add(comment);
//		projectService.updateProject(project);
//		
//		return true;
//		
//	}
	
}
