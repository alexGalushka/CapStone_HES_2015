package edu.harvard.cscie99.adam.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import edu.harvard.cscie99.adam.config.PersistenceConfig;
import edu.harvard.cscie99.adam.config.PersistenceXmlConfig;
import edu.harvard.cscie99.adam.error.UnauthorizedOperationException;
import edu.harvard.cscie99.adam.model.Project;
import edu.harvard.cscie99.adam.model.Plate;
import edu.harvard.cscie99.adam.model.Tag;
import edu.harvard.cscie99.adam.profile.User;
import edu.harvard.cscie99.adam.service.AuthenticationService;
import edu.harvard.cscie99.adam.service.PlateService;
import edu.harvard.cscie99.adam.service.ProjectService;
import junit.framework.TestCase;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(loader = AnnotationConfigContextLoader.class,
        classes = { PersistenceConfig.class, PersistenceXmlConfig.class })
public class ProjectControllerTest extends TestCase {

	Project project = null;
	Plate plate = null;
	
	User user = null;
	
	@Autowired
	private ProjectController projectController;

	@Autowired
	private ProjectService projectService;

	@Autowired
	private PlateService plateService;
	
	@Before
	public void prepareData(){
		project = createProjectObject();
		project = projectService.createProject(project);
		
		plate = createPlateObject();
		plate = plateService.createPlate(plate);
		
		user = new User();
		user.setUsername("ivan");
		user.setPassword("ivan");
	}
	
	@Test
	public void testCreateProject(){
		Project newProject = createProjectObject();
		
		HttpServletRequest request = (HttpServletRequest)Mockito.mock(HttpServletRequest.class);
		HttpSession session = (HttpSession)Mockito.mock(HttpSession.class);
		Mockito.when(request.getSession()).thenReturn(session);
		Mockito.when(session.getAttribute(AuthenticationService.C_USER_SESSION)).thenReturn(user);
		
		try{
			newProject = projectController.createProject(newProject, request);
		}
		catch(Exception e){
			fail();
		}
		assertNotNull(newProject);
		assertNotSame(newProject.getId(), 0);
	}
	
	@Test
	public void testRetrieveProject(){
		
		Project proj = null;
		try{
			proj = projectController.getProject(project.getId());
		}
		catch(Exception e){
			fail();
		}
		assertNotNull(proj);
	}
	
	@Test
	public void testListProjects(){
		
		List<Project> projs = null;
		try{
			projs = projectController.listProjects();
		}
		catch(Exception e){
			fail();
		}
		assertNotNull(projs);
		assertNotSame(projs.size(), 0);
	}
	
	@Test
	public void testUpdateProject(){
		HttpServletRequest request = (HttpServletRequest)Mockito.mock(HttpServletRequest.class);
		HttpServletResponse response = (HttpServletResponse)Mockito.mock(HttpServletResponse.class);
		HttpSession session = (HttpSession)Mockito.mock(HttpSession.class);
		Mockito.when(request.getSession()).thenReturn(session);
		Mockito.when(session.getAttribute(AuthenticationService.C_USER_SESSION)).thenReturn(user);
		
		Project changedProj = createProjectObject();
		changedProj.setDescription("changed");
		
		try{
			changedProj = projectController.updateProject(project.getId(), changedProj, request);
		}
		catch(Exception e){
			fail();
		}
		assertNotNull(changedProj);
	}
	
	@Test
	public void testDeleteProject(){
		HttpServletRequest request = (HttpServletRequest)Mockito.mock(HttpServletRequest.class);
		HttpSession session = (HttpSession)Mockito.mock(HttpSession.class);
		Mockito.when(request.getSession()).thenReturn(session);
		Mockito.when(session.getAttribute(AuthenticationService.C_USER_SESSION)).thenReturn(user);
		
		Project newProj = createProjectObject();
		try {
			newProj = projectController.createProject(newProj, request);
		} catch (UnauthorizedOperationException e1) {
			e1.printStackTrace();
		}
		
		boolean success = false;
		try{
			success = projectController.deleteProject(newProj.getId());
		}
		catch(Exception e){
			fail();
		}
		assertTrue(success);
	}
	
	@Test
	public void testAddingPlateToProject(){
		
		try {
			projectController.removePlateFromProject(project.getId(), plate.getId());
		} catch (UnauthorizedOperationException e) {
			//no plate to remove
		}
		
		boolean success = false;
		try {
			success = projectController.addPlateToProject(project.getId(), plate.getId());
		} catch (UnauthorizedOperationException e) {
			fail();
		}
		
		assertTrue(success);
	}
	
	@Test
	public void testRemovePlateToProject(){
		
		try{
			projectController.addPlateToProject(project.getId(), plate.getId());
		}
		catch(Exception e){
			//already linked
		}
		
		boolean success = false;
		try {
			success = projectController.removePlateFromProject(project.getId(), plate.getId());
		} catch (UnauthorizedOperationException e) {
			fail();
		}
		
		assertTrue(success);
	}
	
	private Project createProjectObject(){
		Project project = new Project();
		project.setCreationDate("date");
		project.setDescription("description");
		project.setLabel("label");
		project.setName("name");
		project.setOwner("owner");
		project.setPublic(true);
		project.setType("type");
		
		return project;
	}
	
	private Plate createPlateObject(){
		Plate plate = new Plate();
		plate.setBarcode("barcode");
		plate.setCreationDate("date");
		plate.setIfValid(true);
		plate.setName("name");
		plate.setNumberOfColumns(5);
		plate.setNumberOfRows(5);
		return plate;
	}

}
