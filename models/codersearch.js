/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getCoderRegistered = async (occupation, name, email, hashedpassword, image, callback) => {
    try {

      let inputValues=[occupation, name, email, hashedpassword, image,]

      let query = 'INSERT INTO coders (occupation_type, name, email, password, image) VALUES ($1, $2, $3, $4, $5) RETURNING *';

      const queryResult = await dbPoolInstance.query(query, inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getCoderRegistered return null"))

      // if allow return empty array, do this: return [];
      };

    } catch(error){
      console.log("codersearch#getCoderRegistered model error "+error);
    };

  };





  let getSearcherRegistered = async (name, email, hashedpassword, image, callback) => {
    try{

      let inputValues=[name, email, hashedpassword, image,]

      let query = 'INSERT INTO searchers (name, email, password, image) VALUES ($1, $2, $3, $4) RETURNING *';

      const queryResult = await dbPoolInstance.query(query, inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getSearcherRegistered return null"))

      // if allow return empty array, do this: return [];
      };

    } catch (error){
      console.log("codersearch#getSearcherRegistered model error "+error);
    }


  };




  const getCoderLoggedIn = async (email) => {
    try{

      const inputValues = [email];

      const query = 'SELECT * FROM coders WHERE email = ($1)';

      const queryResult = await dbPoolInstance.query(query, inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getCoderLoggedIn return null"))

      // if allow return empty array, do this: return [];
      };

    } catch(error) {
      console.log("codersearch#getCoderLoggedIn model error "+error);
    };

  };




  const getSearcherLoggedIn = async (email) => {
    try{

      const inputValues = [email];

      const query = 'SELECT * FROM searchers WHERE email = ($1)';

      const queryResult = await dbPoolInstance.query(query, inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getSearcherLoggedIn return null"))

      // if allow return empty array, do this: return [];
      }

    } catch(error) {
      console.log("codersearch#getSearcherLoggedIn model error "+error);
    }

  };


  const getCoder = async (coder_id) => {
    try{
      const inputValues = [coder_id];
      const query = 'SELECT * FROM coders WHERE id = ($1)';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getcoder return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getcoder model error "+error);
    }
  }



  const getSearcher = async (searcher_id) => {
    try{
      const inputValues = [searcher_id];
      const query = 'SELECT * FROM searchers WHERE id = ($1)';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getsearcher return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getsearcher model error "+error);
    }
  }



  const getCoderSaved = async (id, name, occupation, language, framework, description, street, city, state, zip, country, address, lat, long) => {
    try{
      const inputValues = [id, name, occupation, language, framework, description, street, city, state, zip, country, address, lat, long];
      console.log(inputValues);
      const query = 'UPDATE coders SET name = ($2), occupation_type = ($3), language = ($4), framework = ($5), description = ($6), street = ($7), city = ($8), state = ($9), zip = ($10), country = ($11), address = ($12), lat = ($13), long = ($14) WHERE id = ($1) RETURNING *';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getCoderSaved return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getCoderSaved model error "+error);
    }
  }


  const getSearcherSaved = async (id, name, language, framework, description, street, city, state, zip, country, address, lat, long) => {
    try{
      const inputValues = [id, name, language, framework, description, street, city, state, zip, country, address, lat, long];
      console.log(inputValues);
      const query = 'UPDATE searchers SET name = ($2), language = ($3), framework = ($4), description = ($5), street = ($6), city = ($7), state = ($8), zip = ($9), country = ($10), address = ($11), lat = ($12), long = ($13) WHERE id = ($1) RETURNING *';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getSearcherSaved return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getSearcherSaved model error "+error);
    }
  }



  const getPwChangedCoder = async (coder_id, hashedpassword) => {
    try{
      const inputValues = [coder_id, hashedpassword];
      console.log(inputValues);
      const query = 'UPDATE coders SET password = ($2) WHERE id = ($1) RETURNING *';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getPwChangedCoder return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getPwChangedCoder model error "+error);
    }
  }



  const getPwChangedSearcher = async (coder_id, hashedpassword) => {
    try{
      const inputValues = [coder_id, hashedpassword];
      console.log(inputValues);
      const query = 'UPDATE searchers SET password = ($2) WHERE id = ($1) RETURNING *';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getPwChangedSearcher return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getPwChangedSearcher model error "+error);
    }
  }



  const getPPChangedCoder = async (coder_id, image) => {
    try{
      const inputValues = [coder_id, image];
      console.log(inputValues);
      const query = 'UPDATE coders SET image = ($2) WHERE id = ($1) RETURNING *';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getPPChangedCoder return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getPPChangedCoder model error "+error);
    }
  }



  const getPPChangedSearcher = async (searcher_id, image) => {
    try{
      const inputValues = [searcher_id, image];
      console.log(inputValues);
      const query = 'UPDATE searchers SET image = ($2) WHERE id = ($1) RETURNING *';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getPPChangedSearcher return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getPPChangedSearcher model error "+error);
    }
  }


  const getAllSearchers = async () => {
    try{
      const inputValues = [];
      console.log(inputValues);
      const query = 'SELECT * FROM searchers';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getAllSearchers return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getAllSearchers model error "+error);
    }
  }



  const getAllCoders = async () => {
    try{
      const inputValues = [];
      console.log(inputValues);
      const query = 'SELECT * FROM coders';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getAllCoders return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getAllCoders model error "+error);
    }
  }



  const getAllConvosCoder = async (coder_id) => {
    try{
      const inputValues = [coder_id];
      console.log(inputValues);
      const query = 'SELECT * FROM convos WHERE coder_id = ($1)';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        // return Promise.reject(new Error("codersearch#getAllConvosCoder return null"))
        // if allow return empty array, do this: return [];
        return []

      }

    }catch(error){
      console.log("codersearch#getAllConvosCoder model error "+error);
    }
  }



  const getAllConvosSearcher = async (searcher_id) => {
    try{
      const inputValues = [searcher_id];
      console.log(inputValues);
      const query = 'SELECT * FROM convos WHERE searcher_id = ($1)';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        // return Promise.reject(new Error("codersearch#getAllConvosSearcher return null"))
        // if allow return empty array, do this: return [];
        return []

      }

    }catch(error){
      console.log("codersearch#getAllConvosSearcher model error "+error);
    }
  }



  const getAllChats = async () => {
    try{
      const inputValues = [];
      console.log(inputValues);
      const query = 'SELECT * FROM chats';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        // return Promise.reject(new Error("codersearch#getAllChats return null"))

      // if allow return empty array, do this: return [];
        return []

      }

    }catch(error){
      console.log("codersearch#getAllChats model error "+error);
    }
  }


  const getStartConvo = async (coder_id, searcher_id) => {
    try{
      const inputValues = [coder_id, searcher_id];
      console.log(inputValues);
      const query = 'INSERT INTO convos (coder_id, searcher_id) VALUES ($1, $2) RETURNING *';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getStartConvo return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getStartConvo model error "+error);
    }
  }




  const getChatAdded = async (convo_id, sender_id, receiver_id, sender_name, receiver_name, message) => {
    try{
      const inputValues = [convo_id, sender_id, receiver_id, sender_name, receiver_name, message];
      console.log(inputValues);
      const query = 'INSERT INTO chats (convo_id, sender_id, receiver_id, sender_name, receiver_name, message) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *';

      const queryResult = await dbPoolInstance.query(query,inputValues);

      if( queryResult.rows.length > 0 ){
        return queryResult.rows;

      }else{
        return Promise.reject(new Error("codersearch#getChatAdded return null"))

      // if allow return empty array, do this: return [];

      }

    }catch(error){
      console.log("codersearch#getChatAdded model error "+error);
    }
  }



  return {
    getCoderRegistered,
    getSearcherRegistered,
    getCoderLoggedIn,
    getSearcherLoggedIn,
    getCoder,
    getSearcher,
    getCoderSaved,
    getSearcherSaved,
    getPwChangedCoder,
    getPwChangedSearcher,
    getPPChangedCoder,
    getPPChangedSearcher,
    getAllSearchers,
    getAllCoders,
    getAllConvosCoder,
    getAllConvosSearcher,
    getAllChats,
    getStartConvo,
    getChatAdded,
  };
};