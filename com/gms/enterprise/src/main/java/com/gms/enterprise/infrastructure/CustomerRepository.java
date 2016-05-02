package com.gms.enterprise.infrastructure;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.gms.enterprise.entity.Customer;
import com.gms.enterprise.entity.Item;
import com.gms.enterprise.infrastructure.factories.HibernateSessionFactoryCreator;

public class CustomerRepository {

	public Customer saveNewCustomer(Customer customer) {
		customer.setChangedBy("Lawir");
		customer.setLastChanged(new Date());
		
		Session session = null;
		Transaction transaction = null;
		
		try {
			session = HibernateUtils.getSession();
			transaction = session.beginTransaction();
			session.save(customer);
			transaction.commit();
		}
		finally {
			closeSession(session);
		}
		
		return customer;		
	}
	
	public Customer searchCustomer(int customerId) {
		Session session = null;
		Customer customer = null;
		
		try {
			session = HibernateUtils.getSession();
			session.get(Customer.class, customerId); //.createCriteria(Customer.class).add(Restrictions.eq("ID", customerId));
		}
		finally {
			closeSession(session);
		}
		
		return customer;
	}
	
	public List<Customer> getCustomers() {
		Session session = null;
		List<Customer> customers = new ArrayList<>();
		
		try {
			session = HibernateUtils.getSession();
			customers = session.createCriteria(Customer.class).list(); //.createCriteria(Customer.class).add(Restrictions.eq("ID", customerId));
		}
		finally {
			closeSession(session);
		}
		
		return customers;
	}
	
	private void closeSession(Session session) {
		if (session != null) {
			session.close();
		}
	}
}
