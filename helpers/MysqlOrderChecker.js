

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
            return [['createdAt', 'DESC']];
        }else return [['createdAt']];
    }
    return ['url']; 
}

const checkGroupOrder = (order, type) => {
    if(order === 'groupName'){
        if(type === 'DESC'){
            return [['groupName', 'DESC']]
        }else return ['groupName'];
    }else if(order === 'createdAt'){
        if(type === 'DESC'){
            return [['createdAt', 'DESC']];
        }else return ['createdAt'];
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
    }else if(order === 'createdAt'){
        if(type === 'DESC'){
            return [['createdAt', 'DESC']];
        }else return ['createdAT'];
    }

    return ['createdAt'];
}

module.exports = {
    checkGroupedUrlOrder,
    checkGroupOrder,
    checkUrlOrder,
}