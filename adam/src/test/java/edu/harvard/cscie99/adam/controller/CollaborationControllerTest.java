package edu.harvard.cscie99.adam.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
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
import edu.harvard.cscie99.adam.profile.User;
import junit.framework.TestCase;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(loader = AnnotationConfigContextLoader.class,
        classes = { PersistenceConfig.class, PersistenceXmlConfig.class })
public class CollaborationControllerTest extends TestCase {
	
	@Autowired
	private CollaborationController collaborationController;
	
	@Before
	public void populateData(){
		HttpServletRequest request = (HttpServletRequest)Mockito.mock(HttpServletRequest.class);
		HttpSession session = (HttpSession)Mockito.mock(HttpSession.class);
		Mockito.when(request.getSession()).thenReturn(session);
		
		User user = new User();
		user.setUsername("testUser");
		user.setPassword("testPass");
		user = collaborationController.create(user, request);
	}
	
	@Test
	public void testUserCreation(){
		HttpServletRequest request = (HttpServletRequest)Mockito.mock(HttpServletRequest.class);
		HttpSession session = (HttpSession)Mockito.mock(HttpSession.class);
		Mockito.when(request.getSession()).thenReturn(session);
		
		User user = new User();
		user.setUsername("newUser");
		user.setPassword("newtPass");
		try{
			user = collaborationController.create(user, request);
		}
		catch(Exception e){
			fail();
		}
		
		//ensures user was inserted in DB
		assertNotNull(user);
		assertNotSame(user.getId(), 0);
	}
	
	@Test
	public void testUserRetrieval(){
		
		User user = null;
		try{
			user = collaborationController.getUser("testUser");
		}
		catch(Exception e){
			fail();
		}
		assertNotNull(user);
		assertEquals("testUser", user.getUsername());
	}
	
	@Test
	public void testListUsersButMe(){
		
		HttpServletRequest request = (HttpServletRequest)Mockito.mock(HttpServletRequest.class);
		HttpSession session = (HttpSession)Mockito.mock(HttpSession.class);
		Mockito.when(request.getSession()).thenReturn(session);
		
		List<User> users = null;
		try{
			users = collaborationController.listOtherUsers(request);
		}
		catch(Exception e){
			fail();
		}
		assertNotNull(users);
		assertFalse(users.isEmpty());
	}
	
	@Test
	public void testListAllUsers(){
		
		List<User> users = null;
		try{
			users = collaborationController.getListUser();
		}
		catch(Exception e){
			fail();
		}
		assertNotNull(users);
		assertFalse(users.isEmpty());
	}
	
	@Test
	public void testEditUser(){
		
		User user = new User();
		user.setUsername("testUser");
		user.setLastName("changedLastName");
		user.setFirstName("changedFirstName");
		
		HttpServletRequest request = (HttpServletRequest)Mockito.mock(HttpServletRequest.class);
		HttpSession session = (HttpSession)Mockito.mock(HttpSession.class);
		Mockito.when(request.getSession()).thenReturn(session);
		
		try{
			user = collaborationController.editUser(user, "testUser", request);
		}
		catch(Exception e){
			fail();
		}
		assertEquals(user.getLastName(), "changedLastName");
		assertEquals(user.getFirstName(), "changedFirstName");
	}
	
	@Test
	public void testRemoveUser(){
		
		User user = new User();
		user.setUsername("testUser");
		
		boolean result = false;
		try{
			result = collaborationController.removeUser("testUser");
		}
		catch(Exception e){
			fail();
		}
		assertTrue(result);
	}

}

