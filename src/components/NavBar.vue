<template>
  <div
    class="  pb-2 px-5 items-center  bg-gradient-to-tr  from-orange-500 to-red-500 shadow-xl hover:shadow-2xl  scale-95 transition-all duration-450  rounded-xl w-[98%] m-[1%]  flex ">
    <div class="w-[40%] ">
      <router-link to="/" class="text-white text-4xl  font-lobster-bold">
        Pluggy
      </router-link>
    </div>
    <div class="w-[60%] flex gap-5 justify-end  items-center font-mediun">
      <router-link to="/about" class="text-white text-sm lg:text-lg">
        Link Shortener
      </router-link>
      <router-link to="/about" class="text-white text-sm lg:text-lg">
        PDF Viewer
      </router-link>
    </div>

  </div>
</template>
