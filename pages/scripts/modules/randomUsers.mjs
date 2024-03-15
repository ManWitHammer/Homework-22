const randomU = () => {
    let min = 1
    let max = 86
    const arr = [
        'Иван','Петр','Сергей', 'Александр','Дмитрий',
        'Максим','Артем','Кирилл','Никита','Илья',
        'Денис','Егор','Андрей','Владимир','Николай',
        'Михаил','Роман','Матвей','Тимофей','Ярослав'
    ]
    const countries = [
        'Россия','США','Китай','Япония','Германия',
        'Франция','Великобритания','Италия','Индия','Испания',
        'Канада','Австралия','Бразилия','Индонезия','Пакистан',
        'Нигерия','Бангладеш','Мексика','Филиппины','Вьетнам'
    ]
    const name = arr[Math.floor(Math.random() * arr.length)]
    return {
        name: name,
        age: Math.floor(Math.random()*(max-min)+min),
        country: countries[Math.floor(Math.random() * countries.length)],
        id: name.trim()
    }
}

export default randomU