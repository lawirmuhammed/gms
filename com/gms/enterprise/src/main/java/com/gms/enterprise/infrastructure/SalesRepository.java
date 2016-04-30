package com.gms.enterprise.infrastructure;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import com.gms.enterprise.entity.Sale;
import com.gms.enterprise.infrastructure.SalesDB;

public class SalesRepository {
	
	public Sale createSale(Sale sale) {
		sale.setSaleDate(new Date());
		
		Session session = null;
		try {
			session = HibernateUtils.getSession();
			session.beginTransaction();
			session.save(sale);
			session.getTransaction().commit();
		}
		finally {
			if(session != null) {
				session.close();
			}
		}
		
		return sale;
	}
	
	public Sale findSale(int saleId) {		
		return null;
	}

	public Sale updateSale(Sale sale) {
		
		return null;
	}
	
	public List<Sale> getAllSales() {
		Session session = null;
		List<Sale> allSales = new ArrayList<>();
		
		try {
			session = HibernateUtils.getSession();
			allSales = (List<Sale>)session.createCriteria(Sale.class).list();
		}
		finally {
			if (session != null) {
				session.close();
			}
		}
		return allSales;
	}
}
