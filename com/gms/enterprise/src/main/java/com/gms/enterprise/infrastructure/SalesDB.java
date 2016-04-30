package com.gms.enterprise.infrastructure;

import java.util.HashMap;
import java.util.Map;

import com.gms.enterprise.entity.Customer;
import com.gms.enterprise.entity.Sale;

public class SalesDB {
	public static Map<Integer,Sale> sales = new HashMap<Integer,Sale>(); 
	public static Map<Integer,Customer> customers = new HashMap<Integer,Customer>(); 
}
