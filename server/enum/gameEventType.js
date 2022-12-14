const GameEventType = {
  罚球: '1points',
  两分: '2points',
  三分: '3points',
  罚球未进: 'loss1points',
  两分未进: 'loss2points',
  三分未进: 'loss3points',
  犯规: 'foul',
  技术犯规: 'technicalFoul',
  违体犯规: 'flagrantFoul',
  失误: 'turnover',
  前场篮板: 'offensiveRebounds',
  后场篮板: 'defensiveRebounds',
  助攻: 'assist',
  抢断: 'steal',
  盖帽: 'blockShot',
  暂停: 'pause',
}

module.exports = GameEventType
