// personalProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './personalProfile.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';

const PersonalProfile = () => {
  const [profileData, setProfileData] = useState({});

  const [personalInfo, setpersonalInfo] = useState([
    {
      module_title: 'Education',
      properties: [
        {
          association_name: 'College',
          duration: 'Jun 2022 - Present',
          description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
        {
          association_name: 'Another College',
          duration: 'Sep 2020 - May 2022',
          description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        }
      ]
    },
    {
      module_title: 'Experience',
      properties: [
        {
          association_name: 'XYZ Corp',
          duration: 'Jan 2020 - Dec 2021',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (your long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
        {
          association_name: 'ABC Corp',
          duration: 'Mar 2018 - Nov 2019',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (another long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        }
      ]
    },
    {
      module_title: 'Industry Experience',
      properties: [
        {
          association_name: 'XYZ Corp',
          duration: 'Jan 2020 - Dec 2021',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (your long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
        {
          association_name: 'ABC Corp',
          duration: 'Mar 2018 - Nov 2019',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (another long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
        {
          association_name: 'XYZ Corp',
          duration: 'Jan 2020 - Dec 2021',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (your long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
        {
          association_name: 'XYZ Corp',
          duration: 'Jan 2020 - Dec 2021',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (your long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
        {
          association_name: 'XYZ Corp',
          duration: 'Jan 2020 - Dec 2021',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (your long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
        {
          association_name: 'XYZ Corp',
          duration: 'Jan 2020 - Dec 2021',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (your long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
        {
          association_name: 'XYZ Corp',
          duration: 'Jan 2020 - Dec 2021',
          description: 'dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh ... (your long description) dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
        },
      ]
    },
  ]);


  const [personalmoduleInfo, setapersonalmoduleInfo] = useState([
    {
      insitution: 'Ohlone College',
      attended_from_to: 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
    },
    {
      insitution: 'Ohlone College',
      attended_from_to: 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
    },
    {
      insitution: 'Ohlone College',
      attended_from_to: 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
    },
    {
      insitution: 'Ohlone College',
      attended_from_to: 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
    },
    {
      insitution: 'Ohlone College',
      attended_from_to: 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh',
    },
  ]);

  const [achievements, setAchievements] = useState([]);
  const [preferences, setPreferences] = useState({});

  const { authState } = useAuth();

  const fetchProfileData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authState.token}`
        }
      };
      const response = await axios.get(`${API_BASE_URL}profile/get-user-info/`, config);
      setProfileData(response.data); // Assuming the response contains the profile picture URL
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);


  return (
    <div className='personal-profile-container'>
      <div className='personal-profile-container-inner'>
        <div className='personal-profile-header'>
          <h2>My Profile</h2>
          <div className='personal-profile-description'>
            <h3>{authState.user.role}</h3>
            <div>Active since {formatDateTime(profileData.date_joined, true)}</div>
          </div>
        </div>
        <div className='personal-profile-content'>
          <div className='personal-profile-content-inner'>
            <div className='personal-profile-user-basic-info'>
              <div className='personal-profile-user-basic-info-inner'>
                <div className='personal-profile-user-basic-info-left-side'>
                  <div className='personal-profile-user-basic-info-left-side-inner'>
                    <div className='personal-profile-user-profile-picture'>
                      <img alt={`profile-menu-icon`} src={profileData ? profileData.profilePicture ? profileData.profilePicture : default_profile_picture : default_profile_picture} />
                    </div>
                    <div className='personal-profile-user-info-text'>
                      <div className='personal-profile-name-text'>{profileData.first_name} {profileData.last_name}</div>
                      <div className='personal-profile-username-text'>@{profileData.username}</div>
                    </div>
                  </div>
                </div>
                <div className='personal-profile-user-basic-info-right-side'>

                </div>
              </div>
            </div>
            {personalInfo.map((item, index) => (
              <div className='personal-profile-module-content' key={`${index}-${item.module_title}`}>
                <div className='personal-profile-user-module-info-title-container'>
                  <h2>{item.module_title}</h2>
                </div>
                <div className='personal-profile-user-module-info'>
                  <div className='personal-profile-user-module-info-inner'>
                    {item.properties.map((property, propertyIndex) => (

                      <div className='personal-profile-user-module-per-institution' key={`${propertyIndex}-${property.association_name}`}>
                        <div className='personal-profile-user-educator-per-institution-inner'>
                          <div className='personal-profile-module-institution-title-container'>
                            <h3>{property.association_name}</h3>
                          </div>
                          <div className='personal-profile-module-institution-date-data-container'>
                            <p>{property.duration}</p>
                          </div>
                          <div className='personal-profile-module-institution-description-container'>
                            <div className='personal-eduacation-institution-description-text-container'>
                              <p>{property.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default PersonalProfile;
