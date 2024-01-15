// personalProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './personalProfile.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import OverlayContent from './overlayContent';

const PersonalProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { overlay } = useParams();
  const [profileData, setProfileData] = useState({});
  const [moduleDataToSend, setModuleDataToSend] = useState(null);

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

  const editTabs = [
    {
      edit_tab_title: 'Add Projects',
      value: 'projects',
    },
    {
      edit_tab_title: 'Add Education',
      value: 'education',
    },
    {
      edit_tab_title: 'Add Industry Experience',
      value: 'industry_experience',
    },
  ];

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



  const [editBarCollapsed, setEditBarCollapsed] = useState(true);
  const [activeEditOverlay, setActiveEditOverlay] = useState(null);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const openOverlay = () => {
    setIsOverlayVisible(true);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
    navigate(null, { replace: true });
  };



  const handleEditBarClick = (activeBar) => {
    setActiveEditOverlay(activeBar);
    navigate(`#${activeBar}`, { replace: true });
    openOverlay();
  };


  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    const hasOverlayParam = editTabs.some((tab) => location.hash.includes(tab.value));
    // Conditionally open the overlay based on the parameter
    if (hasOverlayParam) {
      openOverlay();
    }

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
          <div className='personal-profile-content-left'>
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
          <div className='personal-profile-content-right'>
            <div className='personal-profile-content-right-sub'>
              <div className='personal-profile-right-edit-bar-toggle-chevron'>
                <div className='personal-profile-right-edit-bar-toggle-chevron-inner' onClick={() => setEditBarCollapsed(!editBarCollapsed)}>
                  <FontAwesomeIcon icon={faChevronRight} className={`chevron-icon ${editBarCollapsed ? 'collapsed' : ''}`} />
                </div>
              </div>
              <div className={`personal-profile-content-right-inner ${editBarCollapsed ? 'collapsed' : ''}`}>
                  <div className='personal-profile-content-right-inner-inner'>
                    {editTabs.map((tab, index) => (
                      <div className='personal-profile-edit-per-tab' key={`${index}-${tab.edit_tab_title}`} onClick={() => handleEditBarClick(tab.value)} >
                        <div className='personal-profile-edit-per-tab-inner'>
                          {tab.edit_tab_title}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOverlayVisible && (
        <div className="overlay-container" onClick={closeOverlay}>
          <OverlayContent activeEditOverlay={activeEditOverlay} onClose={closeOverlay} setModuleDataToSend={setModuleDataToSend} />
        </div>
      )}
    </div>
  );
};

export default PersonalProfile;
