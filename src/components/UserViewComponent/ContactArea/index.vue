<script lang="ts" setup>
</script>

<template>
    <section class="contact__area pt-115 pb-120">
      <div class="container">
         <div class="row">
            <div class="col-xxl-7 col-xl-7 col-lg-6">
               <div class="contact__wrapper">
                  <div class="section__title-wrapper mb-40">
                     <h2 class="section__title">Get in<span class="yellow-bg yellow-bg-big">touch<img src="@/assets/img/shape/yellow-bg.png" alt=""></span></h2>
                     <p>Have a question or just want to say hi? We'd love to hear from you.</p>
                  </div>
                  <div class="contact__form">
                     <form action="assets/mail.php">
                        <div class="row">
                           <div class="col-xxl-6 col-xl-6 col-md-6">
                              <div class="contact__form-input">
                                 <input type="text" placeholder="Your Name" name="name">
                              </div>
                           </div>
                           <div class="col-xxl-6 col-xl-6 col-md-6">
                              <div class="contact__form-input">
                                 <input type="email" placeholder="Your Email" name="email">
                              </div>
                           </div>
                           <div class="col-xxl-12">
                              <div class="contact__form-input">
                                 <input type="text" placeholder="Subject" name="subject">
                              </div>
                           </div>
                           <div class="col-xxl-12">
                              <div class="contact__form-input">
                                 <textarea placeholder="Enter Your Message" name="message"></textarea>
                              </div>
                           </div>
                           <div class="col-xxl-12">
                              <div class="contact__form-agree  d-flex align-items-center mb-20">
                                 <input class="e-check-input" type="checkbox" id="e-agree">
                                 <label class="e-check-label" for="e-agree">I agree to the<a href="#">Terms & Conditions</a></label>
                              </div>
                           </div>
                           <div class="col-xxl-12">
                              <div class="contact__btn">
                                 <button type="submit" class="e-btn">Send your message</button>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
           <ContactInfo/>
         </div>
      </div>
    </section>
   </template>

   
   