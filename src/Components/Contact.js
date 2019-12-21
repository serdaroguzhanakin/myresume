import React, { Component } from 'react';
import emailjs from 'emailjs-com';

class Contact extends Component {

   constructor(props) {
      super(props);

      this.state = {
         feedback: '', name: 'Emrah', email: 'emrahbasmaz@gmail.com',
         variables: {
            message_html: '',
            from_name: '',
            reply_to: ''
         },
         contact: {
            contactName: '',
            contactEmail: '',
            contactSubject: '',
            contactMessage: ''
         }
      };
   }

   handleSubmit = (event) => {
      event.preventDefault();
      const userId = this.props.data.userId;
      const templateId = this.props.data.templateId;
      
      var templateParams = {
         from_name: this.state.contact.contactName.value,
         to_name: this.state.name.value,
         subject: this.state.contact.contactSubject.value,
         message_html: this.state.feedback.value
      }
      this.sendFeedback(templateId, userId, templateParams);
   }

   sendFeedback(templateId, userId, variables) {
      emailjs.send('gmail', templateId, variables, userId)
         .then(res => {
            console.log('Email successfully sent!')
         })
         // Handle errors here however you like, or use a React error boundary
         .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
   }


   inputChangedHandler = (event) => {
      const updatedForm = {
         ...this.state.contact
      };
      const updatedFormElement = {
         ...updatedForm[event.target.id]
      };

      updatedFormElement.value = event.target.value;
      updatedFormElement.touched = true;
      updatedForm[event.target.id] = updatedFormElement;

      this.setState({ contact: updatedForm });      

      this.setState({
         feedback: updatedForm.contactMessage,
         name: updatedForm.contactName,
         variables: { message_html: updatedForm.contactMessage, from_name: updatedForm.contactName, reply_to: updatedForm.contactEmail }
      });
   }

   render() {

      if (this.props.data) {
         var name = this.props.data.name;
         var city = this.props.data.address.city;
         var zip = this.props.data.address.zip;
         var phone = this.props.data.phone;
         var email = this.props.data.email;
         var message = this.props.data.contactmessage;
      }

      return (
         <section id="contact">

            <div className="row section-head">

               <div className="two columns header-col">

                  <h1><span>Get In Touch.</span></h1>

               </div>

               <div className="ten columns">

                  <p className="lead">{message}</p>

               </div>

            </div>

            <div className="row">
               <div className="eight columns">

                  <form action="" method="post" id="contactForm" name="contactForm" onSubmit={this.handleSubmit}>
                     <fieldset>

                        <div>
                           <label htmlFor="contactName">Name <span className="required">*</span></label>
                           <input type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.inputChangedHandler.bind(this)} />
                        </div>

                        <div>
                           <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                           <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.inputChangedHandler.bind(this)} />/>
                  </div>

                        <div>
                           <label htmlFor="contactSubject">Subject</label>
                           <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.inputChangedHandler.bind(this)} />/>
                  </div>

                        <div>
                           <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                           <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" onChange={this.inputChangedHandler.bind(this)}></textarea>
                        </div>

                        <div>
                           <button className="submit">Submit</button>
                           <span id="image-loader">
                              <img alt="" src="images/loader.gif" />
                           </span>
                        </div>
                     </fieldset>
                  </form>

                  <div id="message-warning"> Error boy</div>
                  <div id="message-success">
                     <i className="fa fa-check"></i>Your message was sent, thank you!<br />
                  </div>

               </div>


               <aside className="four columns footer-widgets">
                  <div className="widget widget_contact">

                     <h4>Address and Phone</h4>
                     <p className="address">
                        {name}<br />
                        <br />
                        {city}, {zip}<br />
                        <span>{phone}</span>
                     </p>
                  </div>

               </aside>
            </div>
         </section>
      );
   }
}

export default Contact;
