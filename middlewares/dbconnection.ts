import mongoose from 'mongoose';
import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'Next';

export const connectToDB = (handler : NextApiHandler) => 
    async (req: NextApiRequest, res: NextApiResponse) => {
        
        console.log('DB está conectado: ', mongoose.connections[0].readyState === 1 ? 'Sim' : 'Não');
        if(mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        const {DB_CONNECTION_STRING} = process.env;
        if(!DB_CONNECTION_STRING) {
            res.status(500).json({error: 'ENV DB_CONNECTION_STRING não preenchida'});
            return res.status(500).json({error : 'ENV DB_CONNECTION_STRING não preenchida'});
        }

        mongoose.connection.on('connected', ()=> console.log('Conectado ao banco de dados'));
        mongoose.connection.on('error', error => console.log('Erro ao conectar ao banco de dados:', error));

        await mongoose.connect(DB_CONNECTION_STRING);

        return handler(req, res);

    }