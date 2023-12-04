<template>
    <h1>404 - Page not found</h1>
    <button @click="goHome">Get back to home</button>
</template>

<script setup>
    const goHome = () => {
        document.location = '/' 
    }
</script>

<script>
export default {

}
</script>

<style>

</style>