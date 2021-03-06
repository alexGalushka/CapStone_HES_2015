package edu.harvard.cscie99.adam.service;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.harvard.cscie99.adam.config.PersistenceConfig;
import edu.harvard.cscie99.adam.config.PersistenceXmlConfig;
import edu.harvard.cscie99.adam.model.DataSet;
import edu.harvard.cscie99.adam.model.Measurement;
import edu.harvard.cscie99.adam.model.Plate;
import edu.harvard.cscie99.adam.model.Project;
import edu.harvard.cscie99.adam.model.ResultSnapshot;
import edu.harvard.cscie99.adam.model.Well;
import edu.harvard.cscie99.adam.model.WellLabel;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(loader = AnnotationConfigContextLoader.class,
        classes = { PersistenceConfig.class, PersistenceXmlConfig.class })
public class ResultServiceTest {
	
	@Autowired
	private ResultService  resultService;
	
	@Autowired
    private SessionFactory sessionFactory;
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private PlateService plateService;
	
	private Project project = null;
	private Plate plate = null;
	private ResultSnapshot result = null;
	private int recentlyCreatedResultID = 0;
	
	@Before
	public void populateData(){
		
		//Create a plate
		plate = new Plate();
		plate.setName("plate1");
		plate.setNumberOfRows(5);
		plate.setNumberOfColumns(5);
		
		for (int i = 0; i < 3; i++){
			WellLabel wellLabel = new WellLabel();
			wellLabel.setName("compound" +i);
		}
		plateService.createPlate(plate);
		
		//Create a project
		project = new Project();
		project.setName("proj1");
		
		List<Plate> plates = new ArrayList<Plate>();
		plates.add(plate);
		project.setPlates(plates);
		projectService.createProject(project);
		
		//Assign plate to project
		plate.setProjectId(project.getId()+"");
		plateService.updatePlate(plate);
		
		//Create a result
		result = new ResultSnapshot();
		List<Measurement> measures = new ArrayList<Measurement>();
		
		for (int i = 0; i < 5; i++){
			for (int j = 0; j < 5; j++){
			
				Measurement m = new Measurement();
				m.setColumn(j);
				m.setRow(i);
				m.setMeasurementType("type"+i);
				m.setValue(Math.random());
				measures.add(m);
			}
		}
		result.setTime(new Date());
		result.setMeasurements(measures);
		resultService.saveResultSnapshot(result);
		
		//Assign result to plate
		List<ResultSnapshot> listResults = new ArrayList<ResultSnapshot>();
		listResults.add(result);
		plate.setResults(listResults);
		plateService.updatePlate(plate);
		
		recentlyCreatedResultID = result.getId();
	}
	
	@Test
	public void testGetResult(){
		
		ResultSnapshot result = null;
		try {
			result = resultService.retrieveResult(recentlyCreatedResultID);
		} catch (Exception e) {
			fail();
		}
		
		assertNotNull(result);
		assertNotNull(result.getTime());
		assertEquals(25, result.getMeasurements().size());
	}
	
	@Test
	public void listResults(){
		List<ResultSnapshot> results = null;
		try {
			results = resultService.listResults();
		} catch (Exception e) {
			fail();
		}
		
		assertNotNull(results);
		assertFalse(results.isEmpty());
	}
	
	@Test
	public void testGetAllWells(){
		ArrayList<HashMap<Object, Object>> wells = null;
		try {
			wells = resultService.getAllWells(project.getId());
		} catch (Exception e) {
			fail();
		}
		
		assertNotNull(wells);
		assertFalse(wells.isEmpty());
	}
	
	@Test
	public void testCreateResult(){
		
		//Create a result
		ResultSnapshot newResult = new ResultSnapshot();
		List<Measurement> measures = new ArrayList<Measurement>();
		
		for (int i = 0; i < 5; i++){
			for (int j = 0; j < 5; j++){
			
				Measurement m = new Measurement();
				m.setColumn(j);
				m.setRow(i);
				m.setMeasurementType("type"+i);
				m.setValue(Math.random());
				measures.add(m);
			}
		}
		newResult.setTime(new Date());
		newResult.setMeasurements(measures);
		
		try {
			newResult = resultService.saveResultSnapshot(result);
		} catch (Exception e) {
			fail();
		}
		
		assertNotNull(newResult);
		assertNotEquals(newResult, 0);
	}
}
