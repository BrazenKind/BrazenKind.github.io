'use client'

import './css/contact_me.css'
import React, { useEffect } from 'react'
//credit to https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server for
//code to submit emails using google scripts + spreadsheets.

export default function Contact_Me () {

    function getFormData(form) {
        var elements = form.elements;
        var honeypot;

        var fields = Object.keys(elements).filter(function(k) {
          if (elements[k].name === "honeypot") {
            honeypot = elements[k].value;
            return false;
          }
          return true;
        }).map(function(k) {
          if(elements[k].name !== undefined) {
            return elements[k].name;
          }else if(elements[k].length > 0){
            return elements[k].item(0).name;
          }
        }).filter(function(item, pos, self) {
          return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name){
          var element = elements[name];

          formData[name] = element.value;

          if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
              var item = element.item(i);
              if (item.checked || item.selected) {
                data.push(item.value);
              }
            }
            formData[name] = data.join(', ');
          }
        });

        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses";
        formData.formGoogleSendEmail
          = form.dataset.email || "";

        return {data: formData, honeypot: honeypot};
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;

        if (formData.honeypot) {
          return false;
        }

        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              form.reset();
              var formElements = form.querySelector(".form-elements")
              if (formElements) {
                formElements.style.display = "none"; // hide form
              }
              var thankYouMessage = form.querySelector(".thankyou_message");
              if (thankYouMessage) {
                thankYouMessage.style.display = "block";
              }
            }
    };

    var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
    }

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
        }
    }

    // this useEffect hook serves the same purpose as the line
    // 'document.addEventListener("DOMContentLoaded", loaded, false);'
    // and the loaded() method did in the original code.
    useEffect(() => {
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            console.log(forms[i]);
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }}, []);

    return (
        <div id = "contact_me">

            <div className = "pan_left">

            </div>
            <div className = "pan_right">
                <div style={{fontSize: '48px'}}> Contact Me </div>
                <form className="gform" method="POST"
  action="https://script.google.com/macros/s/AKfycbzGNppTCc71OFpd0F0Ay_xEktVU4NjSt0vIGrXaYgv9Bw6UkSlpbTn2trPsxl4JSZRSHQ/exec">
                    <fieldset>
                        <label htmlFor="name">Name: </label>
                        <input id="name" name="name" placeholder="What your Mom calls you" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="message">Message: </label>
                        <input id="message" name="message" placeholder="Tell us what's on your mind..." />
                    </fieldset>


                    <fieldset>
                        <label htmlFor="email">Email: </label>
                        <input id="email" name="email" required placeholder="your.name@email.com" />
                    </fieldset>

                    <fieldset className ="" style={{display: 'none'}}>
                        <label htmlFor="honeypot"> </label>
                        <input id="honeypot" type="text" name="honeypot"/>
                    </fieldset>

                    <button className ="button-success pure-button button-xlarge">
                    <i className="fa fa-paper-plane"></i>&nbsp;Send</button>
                    <div style={{display:'none'}} className="thankyou_message">

                        <h2><em>Thanks</em> for contacting us! We will get back to you soon!</h2>
                    </div>

                </form>
            </div>
        </div>
    )
}