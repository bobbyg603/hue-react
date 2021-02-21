export const getGroupById = {
  "name": "Living Room",
  "lights": [
    "11",
    "12"
  ],
  "sensors": [],
  "type": "Room",
  "state": {
    "all_on": true,
    "any_on": true
  },
  "recycle": false,
  "class": "Bedroom",
  "action": {
    "on": true,
    "bri": 234,
    "hue": 8597,
    "sat": 121,
    "effect": "none",
    "xy": [
      0.4452,
      0.4068
    ],
    "ct": 343,
    "alert": "select",
    "colormode": "xy"
  }
};

export const getGroups = {
  "1": {
    "name": "Bedroom",
    "lights": [
      "8",
      "6"
    ],
    "sensors": [],
    "type": "Room",
    "state": {
      "all_on": true,
      "any_on": true
    },
    "recycle": false,
    "class": "Bedroom",
    "action": {
      "on": true,
      "bri": 254,
      "hue": 4451,
      "sat": 254,
      "effect": "none",
      "xy": [
        0.6008,
        0.3764
      ],
      "ct": 153,
      "alert": "select",
      "colormode": "xy"
    }
  },
  "2": {
    "name": "Living Room",
    "lights": [
      "11",
      "12"
    ],
    "sensors": [],
    "type": "Room",
    "state": {
      "all_on": true,
      "any_on": true
    },
    "recycle": false,
    "class": "Bedroom",
    "action": {
      "on": true,
      "bri": 254,
      "hue": 6204,
      "sat": 197,
      "effect": "none",
      "xy": [
        0.5237,
        0.3973
      ],
      "ct": 493,
      "alert": "select",
      "colormode": "xy"
    }
  },
  "3": {
    "name": "Dining Room",
    "lights": [
      "9",
      "10"
    ],
    "sensors": [],
    "type": "Room",
    "state": {
      "all_on": false,
      "any_on": false
    },
    "recycle": false,
    "class": "Dining",
    "action": {
      "on": false,
      "bri": 165,
      "hue": 8418,
      "sat": 140,
      "effect": "none",
      "xy": [
        0.4573,
        0.41
      ],
      "ct": 366,
      "alert": "select",
      "colormode": "ct"
    }
  }
};

export const setName = [{
  "success": {
    "/groups/2/name": "Living Room"
  }
}];

export const setState = [{
  "success": {
    "/groups/2/action/on": true
  }
}, {
  "success": {
    "/groups/2/action/bri": 254
  }
}, {
  "success": {
    "/groups/2/action/xy": [0.4442, 0.4064]
  }
}]