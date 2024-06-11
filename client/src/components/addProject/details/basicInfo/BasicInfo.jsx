import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Editor } from '@tinymce/tinymce-react';
import styles from './BasicInfo.module.css';
import { Helmet } from 'react-helmet-async';

const BasicInfoForm = () => {
  const [userId, setUserID] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [country, setCountry] = useState('Turkey');
  const [projectImages, setProjectImages] = useState([]);
  const [targetAmount, setTargetAmount] = useState('');
  const [campaignDuration, setCampaignDuration] = useState('');
  const [requiresLocation, setRequiresLocation] = useState(false); // Konum bilgisi istenmesi flag'i
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [coverImageIndex, setCoverImageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState(null); // Konum bilgisini tutan state
  const MAX_IMAGES = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/categories/fetch-main-categories`
        );
        if (response.data.success) {
          setCategories(response.data.categories);
        } else {
          setErrorMessage('No categories found!');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/categories/fetch-subcategories`,
        {
          params: { categoryId },
        }
      );
      if (response.data.success) {
        setSubCategories((prevState) => ({
          ...prevState,
          [categoryId]: response.data.subCategories,
        }));
      } else {
        setSubCategories((prevState) => ({
          ...prevState,
          [categoryId]: [],
        }));
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubCategories((prevState) => ({
        ...prevState,
        [categoryId]: [],
      }));
    }
  };

  useEffect(() => {
    const authTokenFromCookie = Cookies.get('authToken');
    const fetchUserID = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}/api/auth`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authTokenFromCookie}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        if (response.data.user) {
          setUserID(response.data.user._id);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (category && categories.length > 0) {
      const selectedCategory = categories.find((cat) => cat._id === category);
      if (selectedCategory) {
        fetchSubCategories(selectedCategory._id);
        setRequiresLocation(selectedCategory.requiresLocation);
      }
    }
  }, [category, categories]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(userId));
    if (savedData) {
      setProjectName(savedData.projectName);
      setProjectDescription(savedData.projectDescription);
      setCategory(savedData.category);
      setSubCategory(savedData.subCategory);
      setCountry(savedData.country);
      setProjectImages(savedData.projectImages);
      setTargetAmount(savedData.targetAmount);
      setCampaignDuration(savedData.campaignDuration);
      setLocation(savedData.location); // Kaydedilmiş konumu yükle
    }
  }, [userId]);

  const handleEditorChange = (content, editor) => {
    setProjectDescription(content);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length + projectImages.length <= MAX_IMAGES) {
      setProjectImages([...projectImages, ...files]);
    } else {
      alert(`You can upload maximum ${MAX_IMAGES} images.`);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...projectImages];
    updatedImages.splice(index, 1);
    setProjectImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (targetAmount <= 0) {
      alert('Hedef miktar pozitif bir değer olmalıdır.');
      return;
    }
  
    if (projectImages.length === 0 || projectImages.length > 10) {
      alert('Lütfen 1 ila 10 arasında resim yükleyin.');
      return;
    }
  
    const validFileExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
    let validFiles = true;
    Array.from(projectImages).forEach((file) => {
      if (!validFileExtensions.test(file.name)) {
        validFiles = false;
      }
    });
  
    if (!validFiles) {
      alert('Dosya formatı desteklenmiyor. Lütfen yalnızca resim ve görüntü dosyaları yükleyin.');
      return;
    }
  
    try {
      const formData = new FormData();
      Array.from(projectImages).forEach((image) => {
        formData.append('photos', image);
      });
  
      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/photos/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
  
      console.log('Uploaded photos:', uploadResponse.data);
  
      const basicInfo = {
        projectName,
        projectDescription,
        category,
        subCategory,
        country,
        projectImages: uploadResponse.data,
        coverImage: coverImageIndex,
        targetAmount: Number(targetAmount),
        campaignDuration: Number(campaignDuration),
        location,
      };
  
      localStorage.setItem(userId, JSON.stringify(basicInfo));
      localStorage.setItem('isBasicsCompleted', 'true');
  
      navigate('/add-project/reward');
      console.log('Basic info submitted successfully!');
    } catch (error) {
      console.error('Error submitting basic info:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };
  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const pushDown = {
    marginBottom: '350px',
  };

  return (
    <div className={styles.formContainer}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Basics of Your Project - AGRICROWD</title>
        <link rel='canonical' href='http://localhost:3000/add-project/basics' />
      </Helmet>
      <h2 className={styles.sidebarTitle}>Let's start with the basics!</h2>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formRowInner}>
            <input
              type='text'
              className={styles.input}
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value.replace(/[^\w\s]/gi, ''))
              }
              required
            />
            <label className={styles.label}>Main title of your project</label>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formRowInner}>
            <label className={styles.label}>Description of your project</label>
            <Editor
              apiKey='g2l3y67ijywjhidyr1mh56zqb0h1my2motorho4r1psyzxd8'
              init={{
                height: 150,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | blocks fontsize | bold italic underline backcolor \
                  align lineheight | checklist numlist bullist indent outdent\
                  emoticons charmap | removeformat | help',
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formRowInner}>
            <select
              className={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value=''>Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            <label className={styles.label}>Select Project Category</label>
          </div>
        </div>

        {category && subCategories[category] && (
          <div className={styles.formRow}>
            <div className={styles.formRowInner}>
              <select
                className={styles.input}
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option value=''>Select Sub-Category</option>
                {subCategories[category].map((subCat) => (
                  <option key={subCat._id} value={subCat._id}>
                    {subCat.subCategoryName}
                  </option>
                ))}
              </select>
              <label className={styles.label}>Sub-Category</label>
            </div>
          </div>
        )}

        <div className={styles.formRow}>
          <div className={styles.formRowInner}>
            <select
              className={styles.input}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value='turkey'>Turkiye</option>
            </select>
            <label className={styles.label}>
              Country (Currently only Turkiye is available!)
            </label>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formRowInner}>
            <input
              type='file'
              className={styles.fileSelector}
              multiple
              onChange={handleImageChange}
              required
            />
            <label className={styles.label}>
              Project Images (Number of photos uploaded: {projectImages.length}{' '}
              / 10. You can upload up to 10 photos. )
            </label>
            <div className={styles.imagePreviewContainer}>
              {projectImages.map((file, index) => (
                <div key={index} className={styles.imagePreviewItem}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className={styles.imagePreview}
                  />
                  {coverImageIndex === index && (
                    <div className={styles.coverIcon}></div>
                  )}
                  <button
                    className={styles.coverPhotoButton}
                    onClick={(e) => {
                      e.preventDefault();
                      setCoverImageIndex(index);
                    }}
                  >
                    Choose Cover Photo
                  </button>
                  <button
                    className={styles.deletePhotoButton}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteImage(index);
                    }}
                  >
                    <img
                      src='/images/trash.svg'
                      alt='Delete'
                      className={styles.trashIcon}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formRowInner}>
            <input
              type='number'
              className={styles.input}
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
              min='1'
            />
            <label className={styles.label}>
              Target Amount (ETH)
            </label>
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formRowInner}>
            <input
              type='number'
              className={styles.input}
              value={campaignDuration}
              onChange={(e) => setCampaignDuration(e.target.value)}
              required
              min='1'
            />
            <label className={styles.label}>
              Your investment collection period (in Days)
            </label>
          </div>
        </div>

        {requiresLocation && (
          <div style={requiresLocation ? pushDown : {}}>
            <p>map section?</p>
          </div>
        )}

        <button
          type='submit'
          className={styles.button}
          encType='multipart/form-data'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BasicInfoForm;
