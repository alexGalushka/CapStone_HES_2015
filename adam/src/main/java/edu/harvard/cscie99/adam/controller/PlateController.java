package edu.harvard.cscie99.adam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.harvard.cscie99.adam.model.Plate;
import edu.harvard.cscie99.adam.model.Template;
import edu.harvard.cscie99.adam.service.AuthenticationService;
import edu.harvard.cscie99.adam.service.PlateService;

@RestController
@RequestMapping(value = "/")
public class PlateController {
	
	//TODO implement
	
	@Autowired
	private PlateService plateService;
	
	@Autowired
	private AuthenticationService authService;
	
	// Template CRUD - START
	@RequestMapping(value = "/template", method = RequestMethod.GET)
	@ResponseBody
	public List<Template> listTemplates(){
		
		return plateService.listTemplates();
	}
	
	@RequestMapping(value = "/template/{template_id}", method = RequestMethod.GET)
	@ResponseBody
	public Template getTemplateDetails(
			@PathVariable("template_id") int templateId){
		
		return plateService.retrieveTemplate(templateId);
	}
	
	@RequestMapping(value = "/template", method = RequestMethod.POST)
	@ResponseBody
	public boolean createTemplate(@RequestBody Template template){
		
		return plateService.createTemplate(template);
	}
	
	@RequestMapping(value = "/template", method = RequestMethod.DELETE)
	@ResponseBody
	public boolean removeTemplate(@RequestBody Template template){
		
		return plateService.removeTemplate(template);
	}
	
	@RequestMapping(value = "/template", method = RequestMethod.PUT)
	@ResponseBody
	public boolean editTemplate(@RequestBody Template template){
		
		return plateService.editTemplate(template);
	}
	// Template CRUD - END

	@RequestMapping(value = "/template/search", method = RequestMethod.GET)
	@ResponseBody
	public List<Template> searchTemplate(
			@RequestParam(value="id", required=false) int id,
			@RequestParam(value="name", required=false) String name,
			@RequestParam(value="description", required=false) String description,
			@RequestParam(value="tag", required=false) String tag,
			@RequestParam(value="type", required=false) Plate.PlateType type){
		
		//TODO
		return null;
	}
	
	// Plate CRUD - START
	@RequestMapping(value = "/plate", method = RequestMethod.GET)
	@ResponseBody
	public List<Plate> listPlates(){
		
		return plateService.listPlates();
	}
	
	@RequestMapping(value = "/plate/{plate_id}", method = RequestMethod.GET)
	@ResponseBody
	public Plate getPlate(@RequestBody int plateId){
		
		return plateService.retrievePlate(plateId);
	}
	
	@RequestMapping(value = "/plate", method = RequestMethod.POST)
	@ResponseBody
	public boolean createPlate(@RequestBody Plate plate){
		
		return plateService.createPlate(plate);
	}
	
	@RequestMapping(value = "/plate", method = RequestMethod.PUT)
	@ResponseBody
	public Plate editPlate(@RequestBody Plate plate){
		
		return plateService.editPlate(plate);
	}
	
	@RequestMapping(value = "/plate", method = RequestMethod.DELETE)
	@ResponseBody
	public boolean removePlate(@RequestBody Plate plate){
		
		return plateService.removePlate(plate);
	}
	// Plate - END
}
