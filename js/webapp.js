(function () {

    var pickAnything = document.querySelector("#pick-anything");
    if (pickAnything) { 
        pickAnything.onclick = function () {
         var pickAny = new MozActivity({
             name: "pick"
         });

         pickAny.onsuccess = function () { 
            var img = document.createElement("img");
            if (this.result.blob.type.indexOf("image") != -1) {
                img.src = window.URL.createObjectURL(this.result.blob);
                document.querySelector("#image-presenter").appendChild(img);
            }
        };

        pickAny.onerror = function () { 
            console.log("An error occurred");
        };
    }
}

var record = document.querySelector("#record");
if (record) { 
    record.onclick = function () {
        var rec = new MozActivity({
                name: "record" // Possibly capture in future versions
            });

        rec.onsuccess = function () { 
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(this.result.blob);
            var imagePresenter = document.querySelector("#image-presenter");
            imagePresenter.appendChild(img);
            imagePresenter.style.display = "block";
        };

        rec.onerror = function () { 
            alert("No taken picture returned");
        };
    }
}

var dial = document.querySelector("#dial");
if (dial) {
    dial.onclick = function () {
        var call = new MozActivity({
            name: "dial",
            data: {
                number: "+46777888999"
            }
        });
    }
}

var sendSMS = document.querySelector("#send-sms");
if (sendSMS) { 
    sendSMS.onclick = function () {
        var sms = new MozActivity({
                name: "new", // Possible compose-sms in future versions
                data: {
                    type: "websms/sms",
                    number: "+46777888999"
                }
            });
    }
}

var addContact = document.querySelector("#add-contact");
if (addContact) { 
    addContact.onclick = function () {
            /*var newContact = new MozActivity({
                name: "new", // Possibly add-contact in future versions
                data: {
                    type: "webcontacts/contact",
                    params: { // Will possibly move to be direct properties under "data"
                        giveName: "Robert",
                        familyName: "Nyman",
                        tel: "+44789",
                        email: "robert@mozilla.com",
                        address: "San Francisco",
                        note: "This is a note",
                        company: "Mozilla"
                    }
                }
            });*/

console.log("Add contact has been pressed");
            // alert("gello");
            writeAContact();
        }
    }

    var deleteAllBtn = document.querySelector("#del-all");
    if (deleteAllBtn) { 
        deleteAllBtn.onclick = function () {
            console.log("Delete all contacts has been pressed");
            deleteAll();
        }
    }

    var listAllBtn = document.querySelector("#list-all");
    if (listAllBtn) { 
        listAllBtn.onclick = function () {
            console.log("List all contacts has been pressed");
            listAll();
        }
    }

    var share = document.querySelector("#share");
    if (share) { 
        share.onclick = function () {
            var sharing = new MozActivity({
                name: "share",
                data: {
                    //type: "url", // Possibly text/html in future versions,
                    number: 1,
                    url: "http://robertnyman.com"
                }
            });
        }
    }

    var shareImage = document.querySelector("#share-image"),
    imgToShare = document.querySelector("#image-to-share");
    if (shareImage && imgToShare) {
        shareImage.onclick = function () {
            var blob = new Blob([imgToShare], {type: "text/png"});
            var sharingImage = new MozActivity({
                name: "share",
                data: {
                    //type: "image/png",
                    number: 1,
                    blobs: blob
                }
            });
        }
    }

    var viewURL = document.querySelector("#view-url");
    if (viewURL) { 
        viewURL.onclick = function () {
            var openURL = new MozActivity({
                name: "view",
                data: {
                    type: "url", // Possibly text/html in future versions
                    url: "http://robertnyman.com"
                }
            });
        }
    }

    var composeEmail = document.querySelector("#compose-email");
    if (composeEmail) { 
        composeEmail.onclick = function () {
            var createEmail = new MozActivity({
                name: "new", // Possibly compose-mail in future versions
                data: {
                    url: "mailto:example@example.org"
                }
            });
        }
    }

    var saveBookmark = document.querySelector("#save-bookmark");
    if (saveBookmark) { 
        saveBookmark.onclick = function () {
            var savingBookmark = new MozActivity({
                name: "save-bookmark",
                data: {
                    type: "url",
                    url: "http://robertnyman.com",
                    name: "Robert's talk",
                    icon: "http://robertnyman.com/favicon.png"
                 }
            });
        }
    }

    // Notifications
    var addNotification = document.querySelector("#add-notification");
    if (addNotification) {
        addNotification.onclick = function () {
            var notification = navigator.mozNotification;
             notification.createNotification(
                "See this", 
                "This is a notification"
                );
        };
    }

    // Lock orientation
    var lockOrientation = document.querySelector("#lock-orientation");
    if (lockOrientation) {
        lockOrientation.onclick = function () {
            /*
                Possible values:
                    "landscape", 
                    "portrait"
                    "landscape-primary"
                    "landscape-secondary"
                    "portrait-primary"
                    "portrait-secondary" 
                    */
                    var portraitLock = screen.mozLockOrientation("portrait");
                    if (portraitLock) {
                        alert("Orientation locked to portrait");
                    }
                };
            }

    // Vibration
    var vibrate = document.querySelector("#vibrate");
    if (vibrate) {
        vibrate.onclick = function () {
            var vibrating =  navigator.vibrate(2000);
            /*
                Possible values:
                    On/off pattern:
                     navigator.vibrate([200, 100, 200, 100]);
                    Turn off vibration
                     navigator.vibrate(0);
                    */
                };
            }

    // Alarm API
    var addAlarm = document.querySelector("#add-alarm");
    if (addAlarm) {
        addAlarm.onclick = function () {
            var alarmId1,
            request = navigator.mozAlarms.add(
                new Date("May 15, 2012 16:20:00"), 
                "honorTimezone", 
                {
                    mydata: "my event"
                }
                );
             request.onsuccess = function (event) {
                alarmId1 = event.target.result;
             };

              request.onerror = function (event) {
                alert(event.target.error.name); 
            };
        }

        // Check connection
        var checkConnection = document.querySelector("#check-connection"),
        connectionDisplay = document.querySelector("#connection-display");

        if (checkConnection && connectionDisplay) {
            checkConnection.onclick = function () {
                var connection = window.navigator.mozConnection,
                online = "<strong>Connected:</strong> " + (connection.bandwidth),
                metered = "<strong>Metered:</strong> " + connection.metered; 

                connectionDisplay.innerHTML = online + "<br>" + metered;
                connectionDisplay.style.display = "block";
            };
        }

        // Check battery
        var checkBattery = document.querySelector("#check-battery"),
        batteryDisplay = document.querySelector("#battery-display");
        if (checkBattery && batteryDisplay) {
            checkBattery.onclick = function () {
                var battery = navigator.battery,
                batteryLevel = Math.round(battery.level * 100) + "%",
                charging = battery.charging,
                chargingTime = parseInt(battery.chargingTime / 60, 10),
                dischargingTime = parseInt(battery.dischargingTime / 60, 10),
                batteryInfo;

                batteryInfo = "<strong>Battery level:</strong> " + batteryLevel + "<br>";
                batteryInfo += "<strong>Battery charging:</strong> " + charging + "<br>";
                batteryInfo += "<strong>Battery charging time:</strong> " + chargingTime + "<br>";
                batteryInfo += "<strong>Battery discharging time:</strong> " + dischargingTime;

                batteryDisplay.innerHTML = batteryInfo;
                batteryDisplay.style.display = "block";
            };
        }
    }
})();


function writeAContact() {

    console.log("writeAContact has been called");

    // first way: setting the properties directly
/*    var contactData = new mozContact();
    contactData.givenName  = ["John"];
    contactData.familyName = ["Doe"];
    contactData.nickname   = ["No kidding"];*/

    // second way: using a value object
    var contactData = {
      givenName: ["Madhuri"],
      familyName: ["Dixit"],
      nickname: ["Madhu"]
  };

    var person = new mozContact(contactData); // Firefox OS 1.3 takes a parameter to initialize the object

    console.log("writeAContact person: " + contactData.givenName );

    if ("init" in person) {
      // Firefox OS 1.2 and below uses a "init" method to initialize the object
      console.warn("writeAContact exec. init function ");
      person.init(contactData);
  } else
  console.warn( "writeAContact init function not found in type mozContact." );

    // save the new contact
    var saving = navigator.mozContacts.save(person);

    saving.onsuccess = function() {
      console.log('new contact saved');
      // This update the person as it is stored
      // It includes its internal unique ID
      // Note that saving.result is null here
  };

  saving.onerror = function(err) {
      console.error(err);
  };
}

function deleteAll() {
   /* var filter = {
      sortBy: familyName,
      sortOrder: ascending,
      filterBy: ['familyName'],
      filterValue: 'd',
      filterOp: startsWith
  }*/

  var request = navigator.mozContacts.getAll( {sortBy: "familyName", sortOrder: "descending"} );
  var count = 0;
  var name = null;

  request.onsuccess = function () {
    if( this.result ) {
        count++;

        name = this.result.givenName + ' ' + this.result.familyName;

        // not working at the moment
        var instanceOfDomRequest = navigator.mozContacts.remove( this.result );

        instanceOfDomRequest.onsuccess = function () {
            console.log( 'removal success' );
        }

        instanceOfDomRequest.onerror = function () {
            console.log( 'removal error' );
        }

        // Display the name of the contact
        console.log( name );

        // Move to the next contact which will
        // call the request.onsuccess with a new result
        this.continue();

    } else {
        console.log(count + ' contacts found.');
    }
}

    request.onerror = function () {
      console.log('Something goes wrong!');
    }
}

/****
Lists the contacts in the console
**/
function listAll() {
    var allContacts = navigator.mozContacts.getAll({sortBy: "familyName", sortOrder: "descending"});

    allContacts.onsuccess = function(event) {
      var cursor = event.target;
        if( cursor.result ) {
            var contact = cursor.result;
            console.log("Found: " + contact.givenName[0] + " " + contact.familyName[0]);
            cursor.continue();
        } else {
            console.log( "No more contacts" );
        }
    }

    allContacts.onerror = function() {
      console.warn("Something went terribly wrong! :(");
    }
}