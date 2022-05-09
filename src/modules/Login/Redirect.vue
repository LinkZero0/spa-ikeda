<template>
  <div>AASAA</div>
</template>
<script>
export default {
  name: "Login",
  mounted() {
    const authUrlGC = process.env.VUE_APP_AUTH_GC;
    const urlApiRpa = `${process.env.VUE_APP_ROOT_API}/auth`;
    window.location.href = `${authUrlGC}/?redirect=${urlApiRpa}`;
  },
};
</script>
