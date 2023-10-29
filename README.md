# TOEFL-Modder

### 背景和问题  

在九月的一个下午，面对着不断逼近的托福考试，蔡桑下定决心，在跳转无数网站与软件之后，终于扒到一份托福真题。然而在历经两小时的钻研后，蔡桑长叹一气：真的要过不了了。 

但是目前现有的英语学习资源均不能如他所愿，一些只提供有限的真题，又充斥着满屏的卖课广告，一些只提供单词的学习，一些只是每日更新一小段听力的素材。蔡桑在无数的资源来回跳跃腾挪间深感不便与憔悴。零碎的APP和网站让他根本无法系统学习，无限高昂的学习和练习成本让他对考试的压力与日俱增。作为他的好朋友们，我们决心为他两肋插刀，共同探索一款随时随地出题、随时随地练习的交互性英语能力提升软件，从听说读写各个方面一起帮助蔡桑击败难题，找回失散的实力——同时，逐步发掘“托福”的真相。 

作为西湖大学的本科生们，托福与雅思考试是我们向着更高水平学习的基础，也是必须跃过的门槛。我们希望设计一款带有西湖大学印记的英语学习软件，帮助到所有如蔡桑这样为英语学习发愁的同学们。 

### 总体设计 

由于仍未知项目的可用时间及可行性，我们策划了几种方案，方便及时调整： 

- 基础版：主体为背单词软件，向用户提供几本词书，为其规划背诵任务，记录错题并且根据记忆曲线帮助用户进行复习，并建立本地数据库存储用户信息和学习进度情况。 

- 升级版：扩展为多应用集成化软件 
  - 用爬虫爬取单词及题目来直接组题，覆盖听力阅读写作 
  - 训练大语言模型，通过导入网络中的文本或音频来反向生成托福听力、阅读、写作的题目。如听力是先将音频转为文本，然后按照阅读的方式进行训练；写作提炼出文章的主题并给用户描述背景，让其进行陈述。（由于托福更注重做题的速度而非思维的深度，所以其题目用AI生成是具有可行性的） 
