"use strict";

var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory("homebridge-ceiling-fan", "CeilingFan", CeilingFan);
}



function CeilingFan(log, config) {
  this.log = log;
  this.name = config.name;
  this._service = new Service.Fan(this.name);
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));

	this.informationService = new Service.AccessoryInformation();
		this.informationService
			.setCharacteristic(Characteristic.Manufacturer, 'CaptainRover')
			.setCharacteristic(Characteristic.Model, 'Ceiling Fan')
			.setCharacteristic(Characteristic.FirmwareRevision, '1.0.0')
			.setCharacteristic(Characteristic.SerialNumber, this.name.replace(/\s/g, '').toUpperCase());

}

CeilingFan.prototype.getServices = function() {
  return [this.informationService,this._service];
}

CeilingFan.prototype._setOn = function(on, callback) {

  this.log("Setting switch to " + on);
  
    if (on) {
    this._service.setCharacteristic(Characteristic.On, false);
    
  } else if (!on ) {
    
      this._service.setCharacteristic(Characteristic.On, true);
   
  }

  callback();
  
}