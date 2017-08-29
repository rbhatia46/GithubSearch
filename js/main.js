$(document).ready(function(){
  $('#searchUser').on('keyup',function(e){
    let username = e.target.value;

    //AJAX request
    $.ajax({
      url : 'https://api.github.com/users/'+username,
      data : {
        client_id : '070a791c11938597a1d4',
        client_secret : 'a874a507d838a45294a65e468fbbffad4bbc3853'
      }
    }).done(function(response){
      $.ajax({
        url : 'https://api.github.com/users/'+username+'/repos',
        data : {
          client_id : '070a791c11938597a1d4',
          client_secret : 'a874a507d838a45294a65e468fbbffad4bbc3853',
          sort : 'created : asc',
          per_page : 5
        }
      }).done(function(repos){
          $.each(repos, function(index,repo){
            $('#repos').append(`
                <div class="well">
                  <div class="row">
                    <div class="col-md-7">
                      <strong>${repo.name}</strong> : ${repo.description}
                    </div>
                    <div class="col-md-3">
                    <span class="label label-default">Forks : ${repo.forks_count}</span>
                    <span class="label label-primary">Watchers : ${repo.watchers_count}</span>
                    <span class="label label-success">Stars : ${repo.stargazers_count}</span>
                    </div>
                    <div class="col-md-2">
                      <a href="${repo.html_url}" target="_blank" class="btn btn-primary">View this Repo</a>
                    </div>
                  </div>

                </div>
              `);
          });
      });
      $('#profile').html(`
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${response.name}</h3>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-md-3">
              <img style="width:100%;" class="thumbnail" src="${response.avatar_url}">
              <a target="_blank" class="btn btn-default btn-block" href="${response.html_url}">Visit Profile</a>
            </div>
            <div class="col-md-9">
            <span class="label label-default">Public Repositories : ${response.public_repos}</span>
            <span class="label label-primary">Public Gists : ${response.public_gists}</span>
            <span class="label label-success">Followers : ${response.followers}</span>
            <span class="label label-info">Following : ${response.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Website/Blog/Portfolio : ${response.blog}</li>
              <li class="list-group-item">Location : ${response.location}</li>
              <li class="list-group-item">Member Since : ${response.created_at}</li>
              <li class="list-group-item">Bio : ${response.bio}</li>

            </ul>
            </div>
          </div>
        </div>
      </div>
      <h3 class="page-header">Latest Repos</h3>
      <div id="repos"></div>
        `);
    });
  });
});
