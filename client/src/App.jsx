import React from 'react'
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import WriteArtical from './pages/WriteArtical';
import BlogTitles from './pages/BlogTitles';
import Dashboard from './pages/Dashboard';
import Generateimages from './pages/Generateimages';
import RemoveBackground from './pages/RemoveBackground';
import RemoveObject from './pages/RemoveObject';
import ReviewResume from './pages/ReviewResume';
import Community from './pages/Community';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
const App = () => {

  




  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ai' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='write-article' element={<WriteArtical/>}/>
          <Route path='Blog-titles' element={<BlogTitles/>}/>
          <Route path='generate-images' element={<Generateimages/>}/>
          <Route path='remove-background' element={<RemoveBackground/>}/>
          <Route path='remove-object' element={<RemoveObject/>}/>
          <Route path='review-resume' element={<ReviewResume/>}/>
          <Route path='community' element={<Community/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
