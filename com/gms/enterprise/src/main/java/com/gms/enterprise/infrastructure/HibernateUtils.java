package com.gms.enterprise.infrastructure;

import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.gms.enterprise.entity.Customer;
import com.gms.enterprise.infrastructure.factories.HibernateSessionFactoryCreator;

public enum HibernateUtils {
	INSTANCE;
	
	private static SessionFactory sessionFactory;
	
	static {
		try {
			sessionFactory = new Configuration().configure().buildSessionFactory();
		}
		catch(Exception e) {
			System.out.println("Exception occured: " + e.getMessage());
		}
	}
	
	public static Session getSession() {
		return sessionFactory.openSession();
	}
	
	Session session;
	public Object save (Object value) {
		SessionFactory sessionFactory = HibernateSessionFactoryCreator.getSessionFactory();
		session = sessionFactory.openSession();
		session.beginTransaction();
		session.save(value);
		session.getTransaction().commit();	
		
		Customer customer = getCustomer(2);

		session.close();
		return customer;
	}
	
	public  Customer getCustomer(int id) {		
		session.beginTransaction();
		Customer customer = session.get(Customer.class, id);
		session.getTransaction().commit();
		return customer;
	}
}
