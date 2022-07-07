export const handleValidation = (formInput, setError, isError, func) => {
    //field Validation
    // debugger
    let error = false;
    if (formInput.collectionName === '') {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, name: "NFT name can't be empty" }
      })
      return false
    } if (!formInput.collectionSymbol) {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, price: "NFT price can't be empty" }
      })
      return false
    } if (!formInput.logo) {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, logo: "Logo can't be empty! Please add a file" }
      })
      return false
    }if (!formInput.bannerImage) {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, bannerImage: "Banner Image can't be empty! Please add a file" }
      })
      return false
    }if (!formInput.featuredImage) {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, featuredImage: "FeaturedImage can't be empty! Please add a file" }
      })
      return false
    }
    if (!error) {
      //add else if htmlFor validating other fields (if any)
      setError({
        activeStep: isError.activeStep + 1,
        error: false,
        errorMessage: {}
      });
      //calling mint NFt if field validation are done.
      return true
    } else {
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, validationError: "Please fix the error in fields above and try again" }
      })
      return false
    }
  }
