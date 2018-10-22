

const checkGroupedUrlOrder = (order,type) => {
    if(order === 'groupName'){
        if(type === 'DESC'){
            return [['groupName', 'DESC']];
        }else return ['groupName']
    }else if(order === 'url'){
        if(type === 'DESC'){
            return [['url', 'DESC']];
        }else return ['url'];
    }else if(order === 'date'){
        if(type === 'DESC'){
            return [['CreatedAt', 'DESC']];
        }else return [['CreatedAt']];
    }
    return ['url']; 
}

const checkGroupOrder = (order, type) => {
    if(order === 'groupName'){
        if(type === 'DESC'){
            return [['groupName', 'DESC']]
        }else return ['groupName'];
    }else if(order === 'CreatedAt'){
        if(type === 'DESC'){
            return [['CreatedAt', 'DESC']];
        }else return ['CreatedAt'];
    }
    return ['groupName'];
}

const checkUrlOrder = (order, type) => {
    if(order === 'groupName'){
        if(type === 'DESC'){
            return [['groupName', 'DESC']];
        }else return ['groupName'];
    }else if(order === 'url'){
        if(type === 'DESC'){
            return [['url', 'DESC']];
        }else return ['url'];
    }else if(order === 'CreatedAt'){
        if(type === 'DESC'){
            return [['CreatedAt', 'DESC']];
        }else return ['CreatedAT'];
    }

    return ['CreatedAt'];
}

module.exports = {
    checkGroupedUrlOrder,
    checkGroupOrder,
    checkUrlOrder,
}