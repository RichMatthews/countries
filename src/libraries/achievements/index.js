export class Achievements {
    firstAchievement() {
        return Achievements.fireNotification({ title: 'First of many', message: 'You unlocked an achievement!' })
    }

    static fireNotification(achievement) {}
}

export default new Achievements()
