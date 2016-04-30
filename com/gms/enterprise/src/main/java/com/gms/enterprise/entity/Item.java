package com.gms.enterprise.entity;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Item {
	private int category;
	private String name;
	private int price;
	private int bulkCost;
	private int numberOfItemsInBulk;

	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getBulkCost() {
		return bulkCost;
	}
	public void setBulkCost(int bulkCost) {
		this.bulkCost = bulkCost;
	}
	public int getNumberOfItemsInBulk() {
		return numberOfItemsInBulk;
	}
	public void setNumberOfItemsInBulk(int numberOfItemsInBulk) {
		this.numberOfItemsInBulk = numberOfItemsInBulk;
	}
}
