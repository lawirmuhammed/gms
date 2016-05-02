package com.gms.enterprise;

import static org.junit.Assert.*;

import java.util.Date;

import javax.transaction.Transaction;

import org.hibernate.Session;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import static org.mockito.Mockito.*;

import com.gms.enterprise.entity.Customer;
import com.gms.enterprise.infrastructure.CustomerRepository;
import com.gms.enterprise.infrastructure.HibernateUtils;

import junit.framework.Assert;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class CustomerRepositoryTest {

	@Mock
	Session session;
	@Mock
	Transaction transaction;
	@Mock
	HibernateUtils hibernateUtils;
	
	@Before
	public void setup() throws Exception{
		when(session.beginTransaction()).thenAnswer((InvocationOnMock invocation) -> transaction);		
		doNothing().when(transaction).commit();
		when(hibernateUtils.getSession()).thenReturn(session);
	}

	@Test
	public void saveNewCustomer_newCustomer_returnSavedCustomer() throws Exception{
		// Given
		final Customer customer = new Customer();
		
		when(session.save(customer)).then((InvocationOnMock invocation) -> {
			customer.setCustomerId(111);
			return customer;
		});
		
		// When
		CustomerRepository customerRepository = new CustomerRepository(); 
		customerRepository.saveNewCustomer(customer);
		
		// Then
		assertSame(customer.getCustomerId(), 111);
	}
	
	public Customer createCustomer(Customer customer) {
		customer.setChangedBy("Lawir");
		customer.setLastChanged(new Date());
		
		Session session = null;
		
		try {
			session = HibernateUtils.getSession();
			session.beginTransaction();
			session.save(customer);
			session.getTransaction().commit();
		}
		finally {
			//closeSession(session);
		}
		
		return customer;		
	}

}
