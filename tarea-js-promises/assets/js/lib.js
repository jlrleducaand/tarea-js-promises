/**
 * Función fetch con retardo (ms)
 * @param {RequestInfo | URL} input 
 * @param {RequestInit | undefined} init
 * @param {Integer} ms
 * @returns {Promise<Response>}
 */
async function fetchSlow(input, init=null, ms=1000){
    let p;
    p=await fetch(input, init);
    await new Promise(resolve => setTimeout(resolve, ms));
    return p;
}