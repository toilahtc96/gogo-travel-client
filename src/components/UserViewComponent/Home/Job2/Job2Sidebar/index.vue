<script lang="ts" setup>
import { JobResponse } from "@/type/JobResponse";
import { onMounted, ref, watch } from "vue";

const props = defineProps(['jobData']);
onMounted(()=>{
})
const setupJobSideBar = (job: JobResponse) => {
   job2SidebarInformationElement.value.setupJobSideBar(job);
}
const job2SidebarInformationElement = ref();
defineExpose({
   setupJobSideBar
})
</script>
<template>
   <div class="col-xxl-4 col-xl-4 col-lg-4">
      <div class="course__sidebar pl-70 p-relative">
         <Job2SidebarInformation ref="job2SidebarInformationElement" />
         <!-- RelatedCourse start -->
         <RelatedJob DetailsPage="course__sidebar-widget-2 white-bg mb-20" />
         <!-- RelatedCourse end -->

      </div>
   </div>

   <!-- video modal  start-->
   <div>
      <div class="video-modal-wrapper">
         <b-modal id="modal-center" centered>
            <p><iframe src="https://www.youtube.com/embed/yJg-Y5byMMw" title="YouTube video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe></p>
         </b-modal>
      </div>
   </div>
   <!-- video modal  end-->
</template>