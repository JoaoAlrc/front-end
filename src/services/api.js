import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
});

const headers = {
  'x-access-token': AsyncStorage.getItem('@user:token'),
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const returnResponse = (response) => {
  return new Promise((resolve, reject) => {
    if (response.status >= 400 && response.status < 600) {
      switch (response.status) {
        case 403:
          return reject("Não autorizado");
        case 404:
          return reject("Página não encontrada");
        case 422:
          return reject("Requisição incorreta");
        default:
          if (response.data != undefined && response.data != '') reject(response.data);
          reject("Erro no servidor");
      }
    }
    else {
      return resolve(response.data)
    }
  })
}

export const UserAPI = {
  login: async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      const body = {
        "email": email,
        "password": password
      }
      const response = await instance.post('/auth/login', body, config).then(returnResponse)
      return response
    } catch (error) {
      return error
    }
  },
  getInfo: token => {
    const myHeaders = new Headers()
    myHeaders.append('x-access-token', token)
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: myHeaders
    }
    return fetch(`${url}/api/user/info`, config).then(returnResponse)
  }
}

export const AccountAPI = {
  getAllClients: _ => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/account/clients`, config).then(returnResponse)
  },
  getContacts: _ => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/account/contacts`, config).then(returnResponse)
  },
  createContacts: (campaign) => {
    const config = {
      method: 'POST',
      body: JSON.stringify(campaign),
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/account/contacts`, config).then(returnResponse)
  },
  updateContacts: (account_contact_id, campaign) => {
    const config = {
      method: 'PUT',
      body: JSON.stringify(campaign),
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/account/contacts/${account_contact_id} `, config).then(returnResponse)
  },
}

export const CampaignAPI = {
  create: (campaign) => {
    const config = {
      method: 'POST',
      body: JSON.stringify(campaign),
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/campaign`, config).then(returnResponse)
  },
  update: (campaign_id, campaign) => {
    const config = {
      method: 'PUT',
      body: JSON.stringify(campaign),
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/campaign/${campaign_id}`, config).then(returnResponse)
  },
  //NOT TESTED
  getAll: _ => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/campaign`, config).then(returnResponse)
  },
  getCampaignWithGroupBySite: _ => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/campaign/site`, config).then(returnResponse)
  },
  getById: campaign_id => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/campaign/${campaign_id}`, config).then(returnResponse)
  },
  getGroups: campaign_id => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/campaign/${campaign_id}/groups`, config).then(returnResponse)
  }
}

export const GroupAPI = {
  getGroup: (group_id) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/group/${group_id}`, config).then(returnResponse)
  },
  getComments: (group_id) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/group/${group_id}/comments`, config).then(returnResponse)
  },
  getPlacements: (group_id) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/group/${group_id}/placements`, config).then(returnResponse)
  },
  getFormats: (group_id) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/group/${group_id}/formats`, config).then(returnResponse)
  },
  approveProposal: (group_id) => {
    const config = {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/group/${group_id}/approve`, config).then(returnResponse)
  },
  allowEdit: (group_id) => {
    const config = {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/group/${group_id}/disapprove`, config).then(returnResponse)
  },
  update: (group_id, group) => {
    const config = {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders(),
      body: JSON.stringify(group)
    }
    return fetch(`${url}/api/sap/group/${group_id}`, config).then(returnResponse)
  },
  create: (group) => {
    const config = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders(),
      body: JSON.stringify(group)
    }
    return fetch(`${url}/api/sap/group/`, config).then(returnResponse)
  },
  createComment: (group_id, comment) => {
    const config = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders(),
      body: JSON.stringify(comment)
    }
    return fetch(`${url}/api/sap/group/${group_id}/comment`, config).then(returnResponse)
  },
  delete: (group_id) => {
    const config = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/group/${group_id}`, config).then(returnResponse)
  },
  read: (group_id) => {
    const config = {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/group/${group_id}/mark_as_read`, config).then(returnResponse)
  },
  // createPlacement: (group_id, placement) => {
  //   const config = {
  //     method: 'POST',
  //     mode: 'cors',
  //     cache: 'default',
  //     headers: getHeaders(),
  //     body: JSON.stringify(placement)
  //   }
  //   return fetch(`${url}/api/sap/group/${group_id}/placement`, config).then(returnResponse)
  // }
}

export const PlacementAPI = {
  create: (placement) => {
    const config = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders(),
      body: JSON.stringify(placement)
    }
    return fetch(`${url}/api/sap/placement`, config).then(returnResponse)
  },
  update: (placement_id, placement) => {
    const config = {
      method: 'PUT',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders(),
      body: JSON.stringify(placement)
    }
    return fetch(`${url}/api/sap/placement/${placement_id}`, config).then(returnResponse)
  },
  delete: (placement_id) => {
    const config = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'default',
      headers: getHeaders()
    }
    return fetch(`${url}/api/sap/placement/${placement_id}`, config).then(returnResponse)
  }
}