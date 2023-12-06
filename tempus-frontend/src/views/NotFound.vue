<template>
    <div class="container">
      <h1>Oops! This page is lost in space.</h1>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <button @click="goHome">Take Me Home</button>
      <!-- You could add more navigation options or a search bar here -->
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goHome = () => {
      router.push('/');
  }
  </script>
  
  <style>
  .container {
      text-align: center;
      padding: 50px;
  }
  
  h1 {
      color: #333;
      font-size: 2em;
  }
  
  p {
      color: #666;
      margin-bottom: 20px;
  }
  
  button {
      background-color: #4CAF50;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
  }
  </style>