package edu.harvard.cscie99.adam.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

/**
 * 
 * @author Gerson
 *
 */
@Entity
public class Well implements Serializable{
	
	/**
	 * Initial version
	 */
	private static final long serialVersionUID = 1L;
	
	public enum ControlType {POSITIVE, NEGATIVE, REFERENCE}

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "well_id")
	private Integer id;
	
	@Column(name = "plate_position_x")
	private int platePositionX;
	
	@Column(name = "plate_position_y")
	private int platePositionY;
	
	// add each label to this string separated by space character
	@Column(name = "labels")
	private String labels;
	
	@Column(name = "color")
	private Integer color;
	
	@Column(name = "control_type")
	private ControlType controlType;
	
	@Column(name = "if_valid")
	private ControlType ifValid;
	
	@Column(name = "substrate")
	private Substrate substare; 
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Compound> compouds;

	@Column(name = "well_result")
	private WellResult wellResult;
	

	public int getPlatePositionX() {
		return platePositionX;
	}
	public void setPlatePositionX(int platePositionX) {
		this.platePositionX = platePositionX;
	}
	public int getPlatePositionY() {
		return platePositionY;
	}
	public void setPlatePositionY(int platePositionY) {
		this.platePositionY = platePositionY;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getLabels() {
		return labels;
	}
	public void setLabels(String labels) {
		this.labels = labels;
	}
	public Integer getColor() {
		return color;
	}
	public void setColor(Integer color) {
		this.color = color;
	}
	public ControlType getControlType() {
		return controlType;
	}
	public void setControlType(ControlType controlType) {
		this.controlType = controlType;
	}
	public WellResult getWellResult() {
		return wellResult;
	}
	public void setWellResults(WellResult wellResult) {
		this.wellResult = wellResult;
	}

	public ControlType getIfValid() {
		return ifValid;
	}
	public void setIfValid(ControlType ifValid) {
		this.ifValid = ifValid;
	}
}
