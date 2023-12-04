<template>
    <h1>Hello {{ $route.params.username }}</h1>
</template>

<script>

</script>

<script setup>
    import { useRoute } from 'vue-router';

    const { params } = useRoute();
    const username = params.username;
    document.title = `Boards`
</script>