package com.gms.enterprise.infrastructure;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.gms.enterprise.infrastructure.factories.HibernateSessionFactoryCreator;

public class HibernateUtils {
	private static HibernateUtils instance;
	private SessionFactory sessionFactory;
	
	private HibernateUtils() {
		try {
			sessionFactory = new Configuration().configure().buildSessionFactory();
		}
		catch(Exception e) {
			System.out.println("Exception occured: " + e.getMessage());
		}
	}
	
	public HibernateUtils getInstance() {
		if(instance == null) {
			instance = new HibernateUtils(); 
		}
		
		return instance;
	}
	
	public static Session getSession() {		
		return HibernateSessionFactoryCreator.getSessionFactory().openSession();
	}
}
