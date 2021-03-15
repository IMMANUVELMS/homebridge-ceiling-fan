# homebridge-ceiling-fan
Homebridge Ceiling Fan Accessory

Homebridge users can use this npm to add their Ceiling Fan to homekit with the help of this module.i have been developed this with the help of the following npms modules.
all Credit's are goes them only.

1.homebridge-dummy
2.homebridge-http-lightbulb
3.axios 

little tweaking done by me to work with my setup

Sample config is follows,
"accessories": [
       {
            "accessory": "CeilingFan",
            "name": "Bedroom Fan",
            "onLink": "http://192.168.250.2:3001/ON",
            "offLink": "http://192.168.250.2:3001/OFF",
            "statusLink": "http://192.168.250.2:3001/STATUS"
        }
      ]  
      
 the above statusLink should return "1" or "ON" and "0" or "OFF" for status     
