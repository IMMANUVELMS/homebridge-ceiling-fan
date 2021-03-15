"use strict";

var Service, Characteristic, HomebridgeAPI;

const httpreq = require("axios");


module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory("homebridge-ceiling-fan", "CeilingFan", CeilingFan);
}



function CeilingFan(log, config) {
  this.log = log;
  this.name = config.name;
  this.onLink = config.onLink;
  this.offLink = config.offLink;
  this.statusLink = config.statusLink;
  this.fanName= config["fan_name"] || this.name;
  this.fanState = false;
  this.log("Starting a fan  with name '" + this.fanName + "'...");

}
CeilingFan.prototype.getPowerOn = function(callback) {
	
  httpreq.get(this.statusLink)
  .then(response => {
    
	//this.log(response.data);
	if(response.data == "ON" || response.data == "1"){
		this.log("'%s' status is ON",this.fanName);
		this.fanState = true;
		callback(null, this.fanState);
	}else if(response.data == "OFF" || response.data == "0"){
		this.log("'%s' status is OFF",this.fanName);
		this.fanState = false;
		callback(null, this.fanState);
	}else{
		this.log("The Fan accessory returns Invalid data");
	}
		
   
  })
  .catch(error => {
    this.log("%s is unreachable",this.fanName);
	callback(error);
  });	

}

CeilingFan.prototype.setPowerOn = function(powerOn, callback) {
	
if(powerOn){	
	  httpreq.get(this.onLink)
	  .then(response => {
		//this.log(response.data);
		if(response.data == "ON" || response.data == "1"){
		this.log("'%s' is set to ON",this.fanName);
		this.fanState = true;
	}
	  })
	  .catch(error => {
		this.log(error);
	  });}
  else{
	 httpreq.get(this.offLink)
  .then(response => {
    //this.log(response.data);
    if(response.data == "OFF" || response.data == "0"){
		this.log("'%s' is set to OFF",this.fanName);
		this.fanState = false;
	}
  })
  .catch(error => {
    this.log("%s is unreachable",this.fanName);
	callback(error);
  }); 
  }	
  //this.log("Set power state on the '%s' to %s", this.fanName, this.fanState);
  callback(null);
}

CeilingFan.prototype.getServices = function() {
    var fanService = new Service.Fan(this.name);
    
    fanService
      .getCharacteristic(Characteristic.On)
      .on('get', this.getPowerOn.bind(this))
      .on('set', this.setPowerOn.bind(this));
    
    return [fanService];
}

