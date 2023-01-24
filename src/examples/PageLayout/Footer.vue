<template>
  <!-- -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
  <footer class="py-5 footer">
    <div class="container">
      <div class="row">
        <div class="mx-auto mb-4 text-center col-lg-8">
          <a href="https://www.ktechhub.com" target="_blank" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            Company
          </a>
          <a href="https://www.ktechhub.com/about" target="_blank" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            About Us
          </a>
          <a href="https://www.ktechhub.com/coaching" target="_blank" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            Coaching
          </a>
          <a href="https://www.ktechhub.com/tutorials" target="_blank" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            Tutorials
          </a>
          <a href="https://www.ktechhub.com/blog" target="_blank" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            Blog
          </a>
          <a href="https://www.ktechhub.com/bootcamp" target="_blank" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
            BootCamps
          </a>
        </div>
        <div class="mx-auto mt-2 mb-4 text-center col-lg-8">
          <a href="ttps://www.facebook.com/ktechhub/" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-facebook"></span>
          </a>
          <a href="https://twitter.com/ktechhub" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-twitter"></span>
          </a>
          <a href="https://www.instagram.com/ktechhub1/" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-instagram"></span>
          </a>
          <a href="https://www.youtube.com/c/ktechhub" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-youtube"></span>
          </a>
          <a href="https://github.com/ktechhub" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-github"></span>
          </a>
          <a href="https://www.linkedin.com/company/ktechhub/" target="_blank" class="text-secondary me-xl-4 me-4">
            <span class="text-lg fab fa-linkedin"></span>
          </a>
        </div>
      </div>
      <div class="row">
        <div class="mx-auto mt-1 text-center col-8">
          <p class="mb-0 text-secondary">
            © {{ new Date().getFullYear() }} KtechHub
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
