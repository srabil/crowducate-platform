Router.map( function () {
  this.route('home', {
    path: '/',
    before: function () {
      // set template depending on login-status
      if( Meteor.userId() ){
        // user is logged in
        this.template = 'signedin';
      } else{
        // user is guest
        this.template = 'home';
      }
    }
  });

  // This template is shown on '/' if logged in
  // this.route('signedin', {
  //   template: 'signedin',
  //   path: '/signedin'
  // });

  this.route('basicinfo', {
    template: 'basicinfo',
    //path: '/basicinfo'
    //path: '/courses/:_id',
    //data: function() { return Posts.findOne({_id: this.params._id}); }
  });

  this.route('curriculum', {
    template: 'curriculum',
    path: '/courses/:_id',
    data: function() {
      // we inject object course and array lectures as the data-context into
      // the template 'curriculum' and we can access those from within our template
      return {
        course: Courses.findOne({_id: this.params._id}),
        lectures: Lectures.find({courseId: this.params._id}),
        sections: Sections.find({courseId: this.params._id})
      };
    }
  });

  this.route('lectureedit', {
    template: 'lectureedit',
    path: '/lectures/:_id/edit',
    data: function(){
      lecture = Lectures.findOne({_id: this.params._id});
      return {
        course: Courses.findOne({_id: lecture.courseId}),
        lecture: lecture
      };
    }
  });

  // Beispiel um die Courses des eingeloggten users anzuzeigen
  this.route('myCourses', {
    data: function(){
      return {
        ownCourses: Courses.find({owner: Meteor.userId()})
      };
    }
  });

  // this.route('currently-learning', {
  //   template: 'currently-learning',
  //   path: '/currently-learning',
  //   data: function(){ 
  //     return {
  //       course: Courses.findOne({_id: this.params._id}),
  //       lectures: Lectures.find({courseId: this.params._id}),
  //       sections: Sections.find({courseId: this.params._id})
  //     };    
  //   }
  // });

  this.route('currentlyLearning', {
    template: 'currentlyLearning',
    layoutTemplate: 'leftNavLayout',
    yieldTemplates: {
      'currentlyLearningLeftNav': {to: 'leftNav'}
    },
    path: '/currentlyLearning/:_id',
    data: function() {
      lecture = Lectures.findOne({_id: this.params._id});
      return {
        course: Courses.findOne({_id: this.params._id}),
        lectures: Lectures.find({courseId: this.params._id}),
        sections: Sections.find({courseId: this.params._id})
      };
    }
  });

  this.route('currentLecture', {
    path: '/currentlyLearning/:_id/:lecture_id',
    template: 'currentLecture',
    data: function() {
      return {
        course: Courses.findOne({_id: this.params._id}),
        lectures: Lectures.find({courseId: this.params._id}),
        sections: Sections.find({courseId: this.params._id})
      }
    }
  })

  this.route('logout', {
    before: function() {
      Meteor.logout();
      this.go('home');
    }
  });
});  