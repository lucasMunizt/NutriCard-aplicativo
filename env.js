const DEV = true; // Mude para false em produção

const getBaseUrl = () => {
    if (DEV) {
        // Em desenvolvimento, use o IP da sua máquina
        return 'http://192.168.0.6:3000/';
    }
    // Em produção, use a URL do seu servidor
    return 'https://seu-servidor-producao.com/';
};

export default {
    ip: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}