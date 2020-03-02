const { createApi } = require('../apis/requests')

const getSysConfigProxy = (token) => {
  const { getRequestAsync } = createApi(token)
  const requestValue = async (url, key) => {
    const getValueUrl = `${url}/api/system-config/${key}`
    const data = await getRequestAsync(getValueUrl)
    return data
  }

  const sleep = (milliseconds) => {
    const start = new Date().getTime()
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break
      }
    }
  }

  const getSysConfig = async (url, key) => {
    while (true) {
      try {
        const data = await requestValue(url, key)
        return data
      } catch (ex) {
        // sleep
        sleep(1000)
        logger.error(`Error getting sysConfig ${ex}`)
      }
    }
  }
  return { getSysConfig }
}

module.exports = getSysConfigProxy
