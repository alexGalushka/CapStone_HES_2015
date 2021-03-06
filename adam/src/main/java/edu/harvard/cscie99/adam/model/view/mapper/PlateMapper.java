package edu.harvard.cscie99.adam.model.view.mapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import edu.harvard.cscie99.adam.model.Well;
import edu.harvard.cscie99.adam.model.view.Plate;

public class PlateMapper {
	
	public static edu.harvard.cscie99.adam.model.Plate getPersistencePlate ( Plate plate){
		
		edu.harvard.cscie99.adam.model.Plate _plate = new edu.harvard.cscie99.adam.model.Plate();
		
		if (plate != null){
			_plate.setId(plate.getId());
			_plate.setBarcode(plate.getBarcode());
			_plate.setCreationDate(plate.getCreationDate());
			_plate.setLabel(plate.getLabel());
			_plate.setName(plate.getName());
			_plate.setNumberOfColumns(plate.getNumberOfColumns());
			_plate.setNumberOfRows(plate.getNumberOfRows());
			_plate.setOwner(plate.getOwner());
			_plate.setProjectId(plate.getProjectId());
			_plate.setProtocolId(plate.getProtocolId());
			_plate.setTags(plate.getTags());
			_plate.setControlTypes(plate.getControlTypes());
			
			List<Well> wells = new ArrayList<Well>();
			
			for (HashMap<String, String> well : plate.getWells()){
				Well _well = null;
				_well = WellMapper.getPersistenceWell(well);
				wells.add(_well);
			}
			_plate.setWells(wells);
			
			_plate.setWellLabels(plate.getWellLabels());
		}
		
		return _plate;
	}
	
	public static Plate getViewPlate ( edu.harvard.cscie99.adam.model.Plate plate){
		
		Plate _plate = new Plate();
		
		Collections.sort(plate.getWells());
		
		if (plate != null){
			_plate.setId(plate.getId());
			_plate.setBarcode(plate.getBarcode());
			_plate.setCreationDate(plate.getCreationDate());
			_plate.setLabel(plate.getLabel());
			_plate.setName(plate.getName());
			_plate.setNumberOfColumns(plate.getNumberOfColumns());
			_plate.setNumberOfRows(plate.getNumberOfRows());
			_plate.setOwner(plate.getOwner());
			_plate.setProjectId(plate.getProjectId());
			_plate.setProtocolId(plate.getProtocolId());
			_plate.setTags(plate.getTags());
			_plate.setControlTypes(plate.getControlTypes());
			
			List<HashMap<String, String>> _wells = new ArrayList<>();
			
			for (Well well : plate.getWells()){
				HashMap<String, String> _well = WellMapper.getViewWell(well);
				_wells.add(_well);
			}
			_plate.setWells(_wells);
			
			_plate.setWellLabels(plate.getWellLabels());
		}
		
		return _plate;
	}
	

}
