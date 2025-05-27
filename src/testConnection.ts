import  pool  from "./db";

(async()=>{
    try {
        const result= await pool.query('SELECT NOW()');
        console.log('Conexión exitosa :', result.rows[0]);
    } catch (error) {
        console.error("Error", error);
       
    } finally{
        await pool.end();
    }
})();