package com.gms.enterprise.presentation;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.gms.enterprise.entity.Sale;
import com.gms.enterprise.infrastructure.SalesRepository;

//import jersey.repackaged.com.google.common.collect.Lists;

@Path("sales")
public class SalesResource {
	
	private SalesRepository salesRepository = new SalesRepository();
		
	@GET
	@Path("{saleId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchSale(@PathParam ("saleId") int saleId) {		
		Sale sale = salesRepository.findSale(saleId);
		if (sale == null) {
			return Response.serverError().build();
		}
		return Response.ok().entity(sale).build();
	}
		
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Sale createSale(Sale sale) {
		sale = salesRepository.createSale(sale);
		
		return sale;
	}
	
	@POST
	@Path("sale")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createSale1(Sale sale) {
		sale = salesRepository.createSale(sale);
		
		if (sale == null) {
			return Response.serverError().build();
		}
		return Response.ok().entity(sale).build();
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateSale(Sale sale) {
		sale = salesRepository.updateSale(sale);
		
		if (sale == null) {
			return Response.serverError().build();
		}
		return Response.ok().entity(sale).build();
	}
	
	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateSale1(Sale sale) {
		return Response.ok().entity(Entity.entity(sale, MediaType.APPLICATION_JSON)).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Sale> getAllSales() {
		List<Sale> sales = salesRepository.getAllSales(); 
		return sales;
	}
	
}
