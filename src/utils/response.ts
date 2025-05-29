import { Response } from 'express';
import messages from './messages.json'; 

type ErrorDetail = {
    message: string;
    error?: any;
};

// (<T>) puede ser cualquier tipo de dato
export const response = {
    ok: <T>(res: Response, data: T) => {
        return res.status(200).json(data);
    },

    created: <T>(res: Response, data: T) => {
        return res.status(201).json(data);
    },

    noContent: (res: Response) => {
        return res.status(204).send();
    },

    notFound: (res: Response, messageKey = 'common.notFound') => {
        const message = getMessage(messageKey);
        return res.status(404).json({ message });
    },

    serverError: (res: Response, error: any, messageKey = 'common.serverError') => {
        const message = getMessage(messageKey);
        return res.status(500).json({ message, error });
    }
};

// Helper para leer mensajes desde el JSON 
export function getMessage(key: string): string {
    return key.split('.').reduce((obj: any, k) => obj?.[k], messages) || key;
}
