package com.gms.enterprise.presentation;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.gms.enterprise.entity.Customer;
import com.gms.enterprise.infrastructure.CustomerRepository;

@Path("customers")
public class CustomerResource {

	private CustomerRepository customerRepository = new CustomerRepository();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Customer> getCustomers() {
		List<Customer> customers = customerRepository.getCustomers(); 
		return customers;
	}

	@GET
	@Path("{customerId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCustomer(@PathParam ("customerId") int customerId) {
		return null;
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCustomer(Customer customer) {
		Customer newCustomer = customerRepository.createCustomer(customer);
		return Response.ok().entity(newCustomer).build();
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateCustomer(Customer customer) {
		return null;
	}
}
