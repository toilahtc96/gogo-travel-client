<script lang="ts" setup>
</script>

<template>
    <section class="contact__area pt-115 pb-120">
      <div class="container">
         <div class="row">
            <div class="col-xxl-7 col-xl-7 col-lg-6">
               <div class="contact__wrapper">
                  <div class="section__title-wrapper mb-40">
                     <h2 class="section__title">Thông Tin<span class="yellow-bg yellow-bg-big"> Của Bạn<img src="@/assets/img/shape/yellow-bg.png" alt=""></span></h2>
                     <p>Hãy để chúng tôi giúp bạn! Cung cấp thông tin liên hệ của bạn để được tư vấn miễn phí.</p>
                  </div>
                  <div class="contact__form">
                     <form action="assets/mail.php">
                        <div class="row">
                           <div class="col-xxl-6 col-xl-6 col-md-6">
                              <div class="contact__form-input">
                                 <input type="text" placeholder="Tên của bạn" name="name">
                              </div>
                           </div>
                           <div class="col-xxl-6 col-xl-6 col-md-6">
                              <div class="contact__form-input">
                                 <input type="email" placeholder="Email của bạn" name="email">
                              </div>
                           </div>
                           <div class="col-xxl-12">
                              <div class="contact__form-input">
                                 <input type="phone" placeholder="Số điện thoại của bạn" name="phone">
                              </div>
                           </div>
                           <div class="col-xxl-12">
                              <div class="contact__form-input">
                                 <input type="text" placeholder="Chuyến đi mà bạn quan tâm" name="subject">
                              </div>
                           </div>
                           <div class="col-xxl-12">
                              <div class="contact__form-input">
                                 <textarea placeholder="Thông tin mà chúng tôi cần quan tâm về bạn" name="message"></textarea>
                              </div>
                           </div>
                           
                           <div class="col-xxl-12">
                              <div class="contact__btn">
                                 <button type="submit" class="e-btn">Gửi ngay</button>
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

   
   