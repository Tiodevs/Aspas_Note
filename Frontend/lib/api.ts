import { getSession } from 'next-auth/react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

class ApiClient {
  private async getAuthHeaders() {
    const session = await getSession()
    
    if (!session?.accessToken) {
      throw new Error('Token de acesso não encontrado')
    }

    return {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    }
  }

  async get(endpoint: string) {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    return response.json()
  }

  async post(endpoint: string, data: Phrase) {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    return response.json()
  }

  async put(endpoint: string, data: Phrase) {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    return response.json()
  }

  async delete(endpoint: string) {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    return response.json()
  }
}

// Instância única do cliente API
export const apiClient = new ApiClient()

// Funções específicas para frases (exemplo de uso)
export const frasesAPI = {
  listar: () => apiClient.get('/phrases'),
  buscarPorId: (id: string) => apiClient.get(`/phrases/${id}`),
  criar: (frase: Phrase) => apiClient.post('/phrases', frase),
  atualizar: (id: string, frase: Phrase) => apiClient.put(`/phrases/${id}`, frase),
  deletar: (id: string) => apiClient.delete(`/phrases/${id}`),
  listarPorUsuario: (userId: string) => apiClient.get(`/phrases/user/${userId}`),
}

interface Phrase {
  id: string;
  phrase: string;
  author: string;
  tags: string[];
  createdAt: string;
}



// Exemplo de uso:
// import { frasesAPI } from '@/lib/api'
// const minhasFrases = await frasesAPI.listar()
